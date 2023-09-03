'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { CertifyList, CertifyPost } from '@/components/challenge-certify';
import { Layout } from '@/components/common';

export default function CertifyPage() {
  const { isLoading, isError, data } = useQuery(['mainChallenge'], mainChallengeCheck);
  if (isLoading) {
    return <h1>is Loading...</h1>;
  }
  if (isError) {
    return <h1>Error Fetching Challenge Data</h1>;
  }
  return (
    <div>
      <div className={`w-full h-[400px] bg-[#white] bg-[url('/certify-banner.png')] bg-no-repeat bg-center border-[1px] border-y-black/.5 mb-20`} />
      <Layout>
        <div className="flex justify-between pb-4 border-b-[1px]">
          <div className="flex">
            <div className="max-w-fit mr-4 px-4 py-1 rounded bg-lightblue flex justify-center items-center text-blue text-sm">북극곰을 위한 챌린지</div>
            <h3>{data?.title}</h3>
          </div>
          <CertifyPost />
        </div>
        <CertifyList />
      </Layout>
    </div>
  );
}
