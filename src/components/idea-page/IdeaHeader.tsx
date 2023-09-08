'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import useSessionStore from '@/store/sesson.store';
import useSortWayStore from '@/store/sortway.store';

import { Button, useDialog } from '../common';

export function IdeaHeader() {
  const { Alert } = useDialog();
  const { session } = useSessionStore();
  const { sortWay, setLatest, setPopular } = useSortWayStore();
  const route = useRouter();
  const [countDown, setCountDown] = useState<string | null>(null);
  const { isLoading, data } = useQuery(['mainChallenge'], mainChallengeCheck);

  const voteComplateDay = 3;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(getRestTime(data?.endDate));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [data?.endDate]);

  function getRestTime(date: any) {
    const timestamp = new Date(date);
    const currentTime = new Date();
    const timeDifference = timestamp.getTime() - currentTime.getTime() - 1000 * 60 * 60 * 24 * voteComplateDay;
    const seconds = Math.floor(timeDifference / 1000) % 60;
    const minutes = Math.floor(timeDifference / 1000 / 60) % 60;
    const hours = Math.floor(timeDifference / 1000 / 60 / 60) % 24;
    const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    if (timeDifference <= 0) {
      return null;
    }
    return `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
  }

  const clickSuggestionButton = () => {
    if (!session) return Alert('로그인 후 이용 가능합니다.');
    route.push('/idea/post');
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="w-full flex justify-between items-center mt-10 pb-4 border-b-2 border-opacityblack">
      <div className="flex gap-6 items-center">
        <h5 className={`text-lg cursor-pointer ${sortWay === '추천순' ? '' : 'text-sub6'}`} onClick={setPopular}>
          추천순
        </h5>
        <h5 className={`text-lg cursor-pointer ${sortWay === '최신순' ? '' : 'text-sub6'}`} onClick={setLatest}>
          최신순
        </h5>
      </div>
      {/* <div className="flex">
        {countDown ? (
          <>
            <p className="text-lg font-medium flex">투표마감까지 남은 시간 : &nbsp; </p>
            <h5 className="w-48">{countDown}</h5>
          </>
        ) : (
          <h5>투표가 종료되었습니다.</h5>
        )}
      </div> */}
      <Button btnType="black" size="large-mo" onClick={clickSuggestionButton}>
        챌린지 제안하기
      </Button>
    </div>
  );
}
