import React, { useEffect, useState } from 'react';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import useSessionStore from '@/store/sesson.store.';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, useDialog } from '../common';
import Modal from '../common/Modal';

export default function JoinChallengeModal() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [mainChallenge, setMainChallenge] = useState('');
  const { Alert } = useDialog();

  const onClickJoinChallenge = async () => {
    if (session?.user) {
      try {
        // 이전 데이터 가져오기
        const { data: previousData, error } = await supabase.from('users').select('point').eq('user_id', session?.user.id).single();
        if (error) {
          console.error('Error fetching previous data', error);
        } else if (previousData) {
          const currentPoint = previousData.point;

          if (currentPoint >= 10) {
            // 포인트가 10 이상일 경우에만 진행
            const updatedPoint = currentPoint - 10;

            // 업데이트된 데이터 삽입
            const { data, error: updateError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session?.user.id);

            if (updateError) {
              console.error('Error updating data:', updateError);
            } else {
              console.log('Data updated successfully:', data);
            }

            // joinChallenge 생성
            // 메인챌린지 한 번만 신청 가능하게 로직 수정!
            await supabase.from('joinChallenge').insert({ user_id: session?.user.id, challenge_id: mainChallenge.challenge_Id });

            Alert('챌린지 참여신청이 완료되었습니다! 참여 인증페이지에서 활동을 인증하고 지구 온도를 지켜주세요! :)');
          } else {
            // 포인트 얻는 법 페이지 (마이페이지) 바로가기 버튼 추가?
            Alert('포인트가 부족하여 신청할 수 없습니다. 포인트를 확인해주세요!');
          }
        }
      } catch (error) {
        console.error('Data Posting Error', error);
      }
    } else {
      Alert('챌린지에 참여하려면 로그인이 필요합니다.');
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  return (
    <Modal>
      <Button onClick={onClickJoinChallenge} btnType={'primary'}>
        참여 신청하기
      </Button>
    </Modal>
  );
}
