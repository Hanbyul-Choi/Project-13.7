'use client';
import React from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-masonry-css';

import { loadChallengeReviewsInfinite } from '@/app/api/challenge-certify';

import './index.css';

import CertifyCard from './CertifyCard';

export function CertifyList() {
  const { data, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['reviews'],
    queryFn: loadChallengeReviewsInfinite,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  const reviewsData = data?.pages?.map(pageData => pageData.data).flat();

  const { ref } = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  if (isError) {
    return <p>Error Fetching Challenge Reviews</p>;
  }
  return (
    <>
      <div className="mt-28">
        <Masonry
          breakpointCols={{
            default: 4,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {reviewsData?.map((post, index) => (
            <CertifyCard key={index} post={post} />
          ))}
        </Masonry>
        {hasNextPage && (
          <p className="h-[55px] flex justify-center items-center mb-[10px]" ref={ref}>
            More Reviews...
          </p>
        )}
      </div>
    </>
  );
}
