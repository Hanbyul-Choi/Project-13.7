'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { loadChallengeReviews } from '@/app/api/challenge-certify';

import CertifyListTest from './CertifyListTest';

export function CertifyList() {
  const { isError, data } = useQuery(['reviews'], loadChallengeReviews);
  if (isError) {
    return <p>Error Fetching Challenge Reviews</p>;
  }

  console.log('reviews:', data);

  return (
    <>
      <div className="flex">
        {data?.map(item => (
          <div key={item.id} className="box-content border-4 m-1 p-2">
            <img src={item.img_url} alt="" />
            <div> {item.mainChallenge.title}c</div>
            <div>
              게시글URL: {item.insta_url.slice(0, 30)}
              {item.insta_url.length > 30 ? '...' : ''}
            </div>
            <div>생성일: {item.created_at.toString().slice(0, 10)}</div>
          </div>
        ))}
      </div>
      <CertifyListTest />
    </>
  );
}
