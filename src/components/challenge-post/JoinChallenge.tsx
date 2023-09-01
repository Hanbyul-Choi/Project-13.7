'use client';
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';



import { mainChallengeCheck } from '@/app/api/challenge-post';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import JoinChallengeModal from './JoinChallengeModal';
import { supabase } from '../../../supabase/supabaseConfig';
import { Button, useDialog } from '../common';

export default function JoinChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const route = useRouter();

  const [joinChallenge, setJoinChallenge] = useState<[]>([]);
  const [mainChallenge, setMainChallenge] = useState('');
  const [currentPoint, setCurrentPoint] = useState(null);

  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);
  const { Alert } = useDialog();

  // 기존 포인트 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: previousData, error } = await supabase.from('users').select('point').eq('user_id', session?.user.id).single();
        if (error) {
          console.error('Error fetching previous data', error);
        } else if (previousData) {
          const fetchedPoint = previousData.point;
          setCurrentPoint(fetchedPoint);
        }
      } catch (error) {
        console.error('Data Fetching Error', error);
      }
    };

    fetchData();
  }, [session]);

  const joinChallengeCurrentPoint = () => {
    if (currentPoint > 25) {
      mainOpenModal();
    } else {
      Alert('포인트가 부족하여 신청할 수 없습니다.', '마이페이지를 통해 포인트 얻는 법을 확인해주세요!');
    }
  };

  const joinChallengeModalHandler = () => {
    if (session?.user) {
      joinChallengeCurrentPoint();
    } else {
      Alert('로그인하세요');
    }
  };

  // userJoinChallengeDataCheck
  const userJoinChallengeCheck = async () => {
    let { data: joinChallenge } = await supabase.from('joinChallenge').select('*').eq('user_id', session?.user.id).eq('challenge_id', mainChallenge.challenge_Id).single();

    setJoinChallenge(joinChallenge);
  };

  // mainChallengeDataCheck
  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await mainChallengeCheck();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await userJoinChallengeCheck();
    };

    if (mainChallenge) {
      fetchData();
    }
  }, [mainChallenge]);

  const onClickToCertifyPage = () => {
    route.push('/challenge/certify');
  };

  console.log('mainChallenge data check:', mainChallenge.challenge_Id);
  console.log('joinChallenge data check:', joinChallenge);

  return (
    <>
      <div>
        {joinChallenge ? (
          <>
            <div className="text-center flex flex-col text-blue">
              <p className="my-8">참여 신청이 완료되었습니다!</p>
              <Button onClick={onClickToCertifyPage} btnType={'primary'}>
                인증하러 가기
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center flex flex-col">
              <Button onClick={joinChallengeModalHandler} btnType={'primary'}>
                참여 신청하기
              </Button>
            </div>
          </>
        )}
        {isOpenMainModal && <JoinChallengeModal />}
      </div>
    </>
  );
}
