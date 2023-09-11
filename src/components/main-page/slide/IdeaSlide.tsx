'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { BarLoader } from 'react-spinners';

import { getSuggestions } from '@/app/api/challenge-idea';
import { CHALLENGE_SUGGESTION } from '@/app/shared/queries.keys';

import Slide from './Slide';

export default function IdeaSlide() {
  let { isLoading, isError, data } = useQuery([CHALLENGE_SUGGESTION], getSuggestions);

  if (isError) {
    return <p>에러</p>;
  }
  if (isLoading || !data) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center ">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }

  if (data && data.length > 10) {
    data = data.slice(0, 10);
  }

  return (
    <section className="border-b-2 mx-auto mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Next Challenge</p>
      <div className="flex justify-between">
        <Link href={'/idea'}>
          <h2 className="text-[23px] sm:text-[36px]">다음 챌린지 제안하기</h2>
        </Link>
      </div>
      <div className={'mt-10'}>
        <Slide showContentNum={3} type="idea" contents={data}></Slide>
      </div>
    </section>
  );
}
