'use client';
import React, { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { PropagateLoader } from 'react-spinners';

import { getIdeaInfinite } from '@/app/api/challenge-idea';

import { Button } from '../common';

import { IdeaContent, IdeaHeader } from '.';

export type SortWay = '추천순' | '최신순';

export function IdeaList() {
  const [sortWay, setSortway] = useState<SortWay>('추천순');

  const { data, fetchNextPage, hasNextPage, isError } = useInfiniteQuery({
    queryKey: ['challengeSuggestion'],
    queryFn: getIdeaInfinite,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
    select: data => {
      return data.pages.map(pageData => pageData.result).flat();
    },
  });

  if (isError) {
    return <p>에러가 발생했습니다. 새로고침 해주세요.</p>;
  }
  const clickNextPage = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      {data ? (
        <>
          <IdeaHeader sortWay={sortWay} setSortway={setSortway} />
          <div className="flex flex-col items-center gap-[7.5rem] mb-20">
            <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-4 gap-y-10">
              {data.map(item => (
                <IdeaContent key={item.post_id} item={item} />
              ))}
            </div>
            <Button btnType="borderBlack" size="large" rounded onClick={clickNextPage}>
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
