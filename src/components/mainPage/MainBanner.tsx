import React, { Fragment } from 'react';

import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { mainChallengeCheck } from '@/app/api/challenge-post';

import { Button, Layout } from '../common';

const mainAnimal = '북극곰';

export default async function MainBanner() {
  const data = await mainChallengeCheck();

  const content = data?.content.split('\n').map((text: string, index: number) => (
    <Fragment key={index}>
      <h5 className="text-sub6 font-semibold mt-4">{text}</h5>
    </Fragment>
  ));

  return (
    <div className="w-full h-[670px] bg-navy">
      <Layout>
        <div className="mt-[10%]">
          <p className="max-w-fit px-6 py-1 border-[1px] border-white text-lg text-white">이달의 챌린지</p>
          <p className="text-white text-[3.5rem] mt-12">위기에 빠진 {mainAnimal}을 도와주세요!</p>
          {content}
          <Link href="/ " className="w-fit mt-10 flex">
            <Button btnType="green" rounded>
              챌린지 참여하기
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
