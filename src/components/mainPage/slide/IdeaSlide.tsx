'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';

import { getSuggestions } from '@/app/api/challenge-idea';

import Slide from './Slide';

export default function IdeaSlide() {
  let { isError, data } = useQuery(['challengeSuggestion'], getSuggestions);

  if (isError) {
    return <p>에러</p>;
  }
  if (!data) {
    return <PropagateLoader color="#36d7b7" size={10} />;
  }

  if (data.length > 10) {
    data = data.slice(0, 10);
  }

  return (
    <section className="border-b-2 mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Next Challenge</p>
      <div className="flex justify-between">
        <Link href={'/idea'}>
          <h2 className="mt-4">다음 챌린지 제안하기</h2>
        </Link>
      </div>
      <div className={'mt-10'}>
        <Slide showContentNum={3} type="idea" contents={data}></Slide>
      </div>
    </section>
  );
}
