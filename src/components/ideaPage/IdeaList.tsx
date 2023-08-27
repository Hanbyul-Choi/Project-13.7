'use client';
import React, { useState } from 'react';

import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { PropagateLoader } from 'react-spinners';

import { getSuggestions } from '@/app/api/ChallengeSuggestion';
import { getLikes } from '@/app/api/ideaLikes';

import IdeaContent from './IdeaContent';
import IdeaHeader from './IdeaHeader';
import Button from '../common/Button';

import type { Likes } from '@/types/db.type';

export type SortWay = '추천순' | '최신순';

export default function IdeaList() {
  const [sortWay, setSortway] = useState<SortWay>('추천순');

  const { isError, data } = useQuery('challengeSuggestion', getSuggestions);
  const { data: likes } = useQuery('ideaLikes', getLikes);
  if (isError) {
    return <p>에러가 발생했습니다. 새로고침 해주세요.</p>;
  }

  return (
    <>
      {data && likes ? (
        <>
          <IdeaHeader sortWay={sortWay} setSortway={setSortway} />
          <div className="flex flex-col items-center gap-[7.5rem] mb-20">
            <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-4 gap-y-10">
              {data.map(item => (
                <IdeaContent key={item.post_id} item={item} likedUsers={likes.find((like: Likes) => like.post_id === item.post_id)?.users} />
              ))}
            </div>
            <Button btnType="borderBlack" size="large" rounded>
              더보기
              <AiOutlineArrowRight size={20} />
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <PropagateLoader color="#36d7b7" size={20} />
        </div>
      )}
    </>
  );
}
