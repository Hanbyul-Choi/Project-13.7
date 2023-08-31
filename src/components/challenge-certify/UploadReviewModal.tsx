'user client';
import React, { useEffect, useState } from 'react';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input, useDialog } from '../common';
import Modal from '../common/Modal';

interface UploadReviewProps {
  modalType: string;
}

const UploadReviewModal: React.FC<UploadReviewProps> = () => {
  const session = useSessionStore((state: { session: any }) => state.session);
  const { Alert } = useDialog();

  const [mainChallenge, setMainChallenge] = useState('');
  const [instaUrl, setInstaUrl] = useState('');

  const { isOpenMainModal, mainCloseModal } = useModalStore();

  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  const onClickSaveReview = async () => {
    try {
      // reviews table 추가
      await supabase.from('reviews').insert({
        user_id: session?.user.id,
        insta_url: instaUrl,
        challenge_id: mainChallenge.challenge_Id,
      });

      // user point 업데이트
      const { data: existingUserPoint, error: existingUserPointError } = await supabase.from('users').select('point').eq('user_id', session?.user.id).single();

      if (existingUserPointError) {
        console.error('Error fetching existing data:', existingUserPointError);
      } else if (existingUserPoint) {
        const currentPoint = existingUserPoint.point || 0;

        const updatedPoint = currentPoint + 10;

        const { data: updatePointData, error: updatePointError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session?.user.id).single();

        if (updatePointError) {
          console.error('Error updating user point data:', updatePointError);
        } else {
          console.log('User point data updated successfully:', updatePointData);
        }
      }

      // joinChallenge reviews 1 추가
      const { data: existingData, error: existingError } = await supabase
        .from('joinChallenge')
        .select('reviews')
        .match({
          user_id: session?.user.id,
          challenge_id: mainChallenge.challenge_Id,
        })
        .single();

      if (existingError) {
        console.error('Error fetching existing data:', existingError);
      } else if (existingData) {
        const currentReviews = existingData.reviews || 0; // Default to 0 if reviews is not present

        const updatedReviews = currentReviews + 1;

        const { data: updateData, error: updateError } = await supabase.from('joinChallenge').update({ reviews: updatedReviews }).match({
          user_id: session?.user.id,
          challenge_id: mainChallenge.challenge_Id,
        });

        if (updateError) {
          console.error('Error updating data:', updateError);
        } else {
          console.log('Data updated successfully:', updateData);
        }
      }
      setInstaUrl('');
      mainCloseModal();

      const updatedChallengeData = await loadMainChallenge(); // 데이터 다시 불러오기
      setMainChallenge(updatedChallengeData);

      if (existingData?.reviews === 9) {
        try {
          updateChallengeStatus();
        } catch (error) {
          console.log('챌린지 성공여부 업데이트 에러');
        }
      } else {
        Alert('인증완료', '챌린지 인증이 완료되었습니다!');
      }
    } catch (error) {
      console.error('Error adding review', error);
    }
  };

  // reviews 갯수에 따른 성공여부(completedMission) 업데이트
  const updateChallengeStatus = async () => {
    let { data: updatedChallenge } = await supabase.from('joinChallenge').update({ completedMission: true }).eq('user_id', session?.user.id).gte('reviews', 10).select(`*, mainChallenge(*)`);

    Alert('챌린지 10회 성공! 마이페이지에서 뱃지를 확인하세요.');
    console.log('Updated Challenge Status:', updatedChallenge);
  };

  return (
    <Modal>
      {isOpenMainModal && (
        <>
          <h3>{mainChallenge?.title}</h3>
          <div className="text-center">
            <p>주의사항: 타인 도용 및 해당 챌린지와 연관이 없는 인증시 챌린지 이용이 제한될 수 있습니다.</p>
            <Input
              value={instaUrl}
              _size={''}
              placeholder="인증 게시글 링크 붙여넣기"
              onChange={e => {
                setInstaUrl(e.target.value);
              }}
            />
            <div className="flex justify-center">
              <Button onClick={onClickSaveReview} btnType={'primary'} size={'small'}>
                인증하기
              </Button>
              <Button onClick={mainCloseModal} btnType={'borderBlack'} size={'small'}>
                취소
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default UploadReviewModal;
