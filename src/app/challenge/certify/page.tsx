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
    <Layout>
      <div className="flex justify-between">
        <div className="flex">
          <div className="max-w-fit px-4 py-1 rounded bg-lightblue mt-4 mr-2 text-blue text-sm">북극곰을 위한 챌린지</div>
          <h3>{mainChallenge?.title}</h3>
        </div>
        {mainChallenge && <CertifyPost user_id={session?.user_id} challengeId={mainChallenge.challenge_Id} />}
      </div>
      <CertifyList />
    </Layout>
  );
}
