'use client';
import React, { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { postCertify } from '@/app/api/challenge-certify';
import { mainChallengeCheck } from '@/app/api/main-challenge';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input, useDialog } from '../common';
import Modal from '../common/Modal';

import type { CertifyPostType } from '@/types/db.type';

const UploadReviewModal = () => {
  const session = useSessionStore((state: { session: any }) => state.session);
  const { Alert } = useDialog();
  const [instaUrl, setInstaUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { isOpenMainModal, mainCloseModal } = useModalStore();

  const { data: mainChallenge } = useQuery(['mainChallenge'], mainChallengeCheck);
  const queryClient = useQueryClient();
  const certifyPostMutation = useMutation(postCertify, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
  });

  const isValidateUrl = async (url: string) => {
    if (!url.includes('https://www.instagram.com/p/')) {
      setErrorMsg('유효한 URL을 입력해주세요');
      return false;
    }
    const { imageUrl, hashtags } = (await axios.get(`http://localhost:3000/api/crawler?url=${instaUrl}`)).data.res;
    console.log(hashtags)
    if (!hashtags) {
      setErrorMsg('#13.7챌린지 해시태그를 추가해주세요');
      return false;
    }
    if (!hashtags.includes('#13.7챌린지')) {
      setErrorMsg('#13.7챌린지 해시태그를 추가해주세요');
      return false;
    }
    return { imageUrl, hashtags };
  };

  const onClickSaveReview = async () => {
    try {
      let res = await isValidateUrl(instaUrl);
      if (!res) {
        return false;
      }
      if (!mainChallenge) return;
      const certifyPost: CertifyPostType = {
        user_id: session?.user_id as string,
        insta_url: instaUrl,
        challenge_id: mainChallenge?.challenge_Id,
        img_url: res.imageUrl,
        tags: res.hashtags,
      };
      // reviews table 추가
      certifyPostMutation.mutate(certifyPost);

      // user point 업데이트
      const { data: existingUserPoint, error: existingUserPointError } = await supabase.from('users').select('point').eq('user_id', session?.user_id).single();

      if (existingUserPointError) {
        console.error('Error fetching existing data:', existingUserPointError);
      } else if (existingUserPoint) {
        const currentPoint = existingUserPoint.point || 0;

        const updatedPoint = currentPoint + 10;

        const { data: updatePointData, error: updatePointError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session?.user_id).single();

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
          user_id: session?.user_id,
          challenge_id: mainChallenge.challenge_Id,
        })
        .single();

      if (existingError) {
        console.error('Error fetching existing data:', existingError);
      } else if (existingData) {
        const currentReviews = existingData.reviews || 0; // Default to 0 if reviews is not present

        const updatedReviews = currentReviews + 1;

        const { data: updateData, error: updateError } = await supabase.from('joinChallenge').update({ reviews: updatedReviews }).match({
          user_id: session?.user_id,
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
    if (updatedChallenge) {
      Alert('챌린지 10회 성공! 마이페이지에서 뱃지를 확인하세요.');
    }
  };
  const animals = {
    animal: '북극곰',
  };

  return (
    <Modal>
      {isOpenMainModal && (
        <div className="flex flex-col justify-center text-center">
          <div className="max-w-fit px-4 py-1 rounded bg-lightblue m-auto mb-4">
            <p className="text-blue text-sm ">{animals.animal}을 위한 챌린지</p>
          </div>
          <h3 className="mb-8">{mainChallenge?.title}</h3>
          <div className="text-center">
            <Input
              value={instaUrl}
              _size="lg"
              placeholder="인증 게시글 링크 붙여넣기"
              onChange={e => {
                setInstaUrl(e.target.value);
              }}
            />
            <p className="text-sm text-nagative leading-[150%] mt-[8px]">주의사항: 타인 도용 및 해당 챌린지와 연관이 없는 인증시 챌린지 이용이 제한될 수 있습니다.</p>
            <p className="text-red-800">{errorMsg}</p>
            <div className="flex justify-center mt-12">
              <Button onClick={mainCloseModal} btnType={'borderBlack'} size={'large'}>
                취소
              </Button>
              <Button onClick={onClickSaveReview} btnType={'primary'} size={'large'} buttonStyle="ml-6">
                인증하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UploadReviewModal;
