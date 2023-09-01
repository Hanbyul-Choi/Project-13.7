'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import { CertifyList, CertifyPost } from '@/components/challenge-certify';
import { Layout } from '@/components/common';

export default function CertifyPage() {
  const { isLoading, isError, data } = useQuery(['mainChallenge'], loadMainChallenge);
  if (isLoading) {
    return <h1>is Loading...</h1>;
  }
  if (isError) {
    return <h1>Error Fetching Challenge Data</h1>;
  }
  console.log('challenge data:', data.title);

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="flex">
          <div className="max-w-fit px-4 py-1 rounded bg-lightblue mt-4 mr-2 text-blue text-sm">북극곰을 위한 챌린지</div>
          <h3>{data.title}</h3>
        </div>
        <CertifyPost />
      </div>
      <CertifyList />
    </Layout>
  );
}



