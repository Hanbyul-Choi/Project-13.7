'use client';
import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { MAIN_CHALLENGE } from '@/app/shared/queries.keys';

import JoinChallenge from './JoinChallenge';
import howtojoin from '../../../public/how-to-join.png';
import SingleLayout from '../layout/SingleLayout';

export default function MainChallengeData() {
  const { data: mainChallenge } = useQuery({ queryKey: [MAIN_CHALLENGE], queryFn: mainChallengeCheck });
  const [countDown, setCountDown] = useState<string | null>();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountDown(getRestTime(mainChallenge?.endDate));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [mainChallenge?.endDate]);

  function getRestTime(date: any) {
    const timestamp = new Date(date);
    const currentTime = new Date();
    const timeDifference = timestamp.getTime() - currentTime.getTime() - 1000 * 60 * 60 * 24;
    // const seconds = Math.floor(timeDifference / 1000) % 60;
    const minutes = Math.floor(timeDifference / 1000 / 60) % 60;
    const hours = Math.floor(timeDifference / 1000 / 60 / 60) % 24;
    const days = Math.floor(timeDifference / 1000 / 60 / 60 / 24);

    if (timeDifference <= 0) {
      return '챌린지가 종료되었습니다.';
    }
    return `${days}일 ${hours}시간 ${minutes}분`;
  }

  if (!mainChallenge) return;
  return (
    <>
      <SingleLayout title={mainChallenge.title} animal="북극곰을">
        <div className="relative mb-[40px] sm:mb-0">
          {countDown && (
            <div className="absolute right-0 -top-5 font-medium flex items-center">
              챌린지 종료까지 남은 시간&nbsp; : &nbsp; <h5>{countDown}</h5>
            </div>
          )}
          <h5 className="pt-4 mb-4 flex items-center sm:before:content-[' '] sm:before:w-[2px] sm:before:bg-blue before:h-[18px] sm:before:inline-block sm:before:mr-[8px]">
            챌린지 내용
          </h5>
          <p className="text-lg leading-[140%]">{mainChallenge.content}</p>
        </div>
        <div className="pt-[40px]">
          <h5 className="mb-[16px] flex items-center sm:before:content-[' '] sm:before:w-[2px] before:bg-blue sm:before:h-[18px] sm:before:inline-block sm:before:mr-[8px]">
            참여방법
          </h5>
          <Image src={howtojoin} alt="how to join challenge" />
          <p className="my-8 text-nagative text-md">*반드시 인증사진과 함께 인증해주셔야 합니다.</p>
          <JoinChallenge mainChallenge={mainChallenge} />
        </div>
      </SingleLayout>
    </>
  );
}
