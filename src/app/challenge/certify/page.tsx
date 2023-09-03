'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { CertifyList, CertifyPost } from '@/components/challenge-certify';
import { Layout } from '@/components/common';
import useSessionStore from '@/store/sesson.store';

export default function CertifyPage() {
  const { isLoading, isError, data: mainChallenge } = useQuery(['mainChallenge'], mainChallengeCheck);
  const { session } = useSessionStore();

  if (isLoading) {
    return <h1>is Loading...</h1>;
  }
  if (isError) {
    return <h1>Error Fetching Challenge Data</h1>;
  }
  return (
    <>
      <div className={`w-full h-[400px] bg-[#white] bg-[url('/certify-banner.png')] bg-no-repeat bg-center border-[1px] border-y-black/.5 mb-20`} />
      <Layout>
        <div className="flex justify-between pb-4 border-b-[1px]">
          <div className="flex">
            <div className="max-w-fit mr-4 px-4 py-1 rounded bg-lightblue flex justify-center items-center text-blue text-sm">북극곰을 위한 챌린지</div>
            <h3>{mainChallenge?.title}</h3>
          </div>
          {mainChallenge && <CertifyPost user_id={session?.user_id} challengeId={mainChallenge.challenge_Id} />}
        </div>
        <CertifyList />
      </Layout>
    </>
  );
}
