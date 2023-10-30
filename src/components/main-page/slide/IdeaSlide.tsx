import React from 'react';

import Link from 'next/link';

import { getSuggestions } from '@/app/api/challenge-idea';

import Slide from './Slide';

import type { Suggestion } from '@/types/db.type';


export default async function IdeaSlide() {
  let suggestions: Suggestion[] = await getSuggestions()
  if (suggestions && suggestions.length > 10) {
    suggestions = suggestions.slice(0, 10);
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
        <Slide showContentNum={3} type="idea" contents={suggestions}></Slide>
      </div>
    </section>
  );
}
