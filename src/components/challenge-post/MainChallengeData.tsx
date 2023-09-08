'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { MAIN_CHALLENGE } from '@/app/shared/queries.keys';

import JoinChallenge from './JoinChallenge';
import howtojoin from '../../../public/how-to-join.png';
import SingleLayout from '../layout/SingleLayout';

export default function MainChallengeData() {
  const { data: mainChallenge } = useQuery({ queryKey: [MAIN_CHALLENGE], queryFn: mainChallengeCheck });

  if (!mainChallenge) return;
  return (
    <>
      <SingleLayout size={true} title={mainChallenge.title} animal="북극곰을">
        <div>
          <h5 className="mb-4 flex items-center before:content-[' '] before:w-[2px] before:bg-blue before:h-[18px] before:inline-block before:mr-[8px]">챌린지 내용</h5>
          <p className="text-lg leading-[140%]">{mainChallenge.content}</p>
        </div>
        <div className="mt-10">
          <h5 className="mb-4 flex items-center before:content-[' '] before:w-[2px] before:bg-blue before:h-[18px] before:inline-block before:mr-[8px]">참여방법</h5>
          <Image src={howtojoin} alt="how to join challenge" />
          <p className="my-8 text-nagative text-sm">*반드시 인증사진과 해시태그에 ‘#13.7챌린지’가 포함 돼 있어야 합니다.</p>
          <JoinChallenge mainChallenge={mainChallenge} />
        </div>
      </SingleLayout>
    </>
  );
}
