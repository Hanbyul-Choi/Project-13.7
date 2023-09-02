'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Masonry from 'react-masonry-css';

import { loadChallengeReviews } from '@/app/api/challenge-certify';

import CertifyCard from './CertifyCard';

import './index.css';

export function CertifyList() {
  const { isError, data } = useQuery(['reviews'], loadChallengeReviews);
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
          {data?.map((post, index) => (
            <CertifyCard key={index} post={post} />
          ))}
        </Masonry>
      </div>
    </>
  );
}
