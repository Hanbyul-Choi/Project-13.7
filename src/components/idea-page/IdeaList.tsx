'use client';
import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BarLoader } from 'react-spinners';

import { getIdeaInfinite } from '@/app/api/challenge-idea';
import { CHALLENGE_SUGGESTION } from '@/app/shared/queries.keys';
import useSortWayStore from '@/store/sortway.store';

import { Button } from '../common';

import { IdeaContent, IdeaHeader } from '.';

export function IdeaList() {
  const { sortWay } = useSortWayStore();

  const { data, fetchNextPage, hasNextPage, isError, isLoading } = useInfiniteQuery({
    queryKey: [CHALLENGE_SUGGESTION, sortWay],
    queryFn: getIdeaInfinite,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  const ideaData = data?.pages?.map(pageData => pageData.result).flat();

  if (isError) {
    return <p>에러가 발생했습니다. 새로고침 해주세요.</p>;
  }

  const clickNextPage = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  return (
    <>
      {!isLoading ? (
        <>
          <IdeaHeader />
          <div className="flex flex-col items-center gap-[7.5rem] mb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-4 gap-y-10">
              {ideaData?.map(item => (
                <IdeaContent key={item.post_id} item={item} />
              ))}
            </div>
            {hasNextPage && (
              <Button btnType="borderBlack" size="large" rounded onClick={clickNextPage}>
                더보기
                <AiOutlineArrowRight size={20} />
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-[50vh] flex justify-center items-center ">
          <BarLoader color="#101828" height={5} width={200} />
        </div>
      )}
    </>
  );
}
