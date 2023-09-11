'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { BarLoader } from 'react-spinners';

import { mainChallengeCheck } from '@/app/api/main-challenge';
import { CertifyList, CertifyPost } from '@/components/challenge-certify';
import { Layout } from '@/components/common';
import useSessionStore from '@/store/sesson.store';

export default function CertifyPage() {
  const { isLoading, isError, data: mainChallenge } = useQuery(['mainChallenge'], mainChallengeCheck);
  const { session } = useSessionStore();

  if (isLoading) {
    return (
      <div className="absolute top-[50%] left-[50%] -translate-x-center -translate-y-center">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }
  if (isError) {
    return <h1>Error Fetching Challenge Data</h1>;
  }
  return (
    <>
      <div className="px-100w-full mx-auto md:max-w-[77rem] border-y-[1px]">
        <div
          className={`float-left ml-2 w-full md:h-[400px] h-[300px] bg-[#white] md:bg-[url('/certify-banner-text.png')] bg-[url('/banner-text-mo.png')] bg-no-repeat bg-left mb-6`}
        />
        <div
          className={`w-full md:h-[400px] h-[600px] bg-[#white] md:bg-[url('/certify-banner.png')] bg-[url('/certify-banner-mo.png')] bg-no-repeat bg-center mb-6`}
        />
      </div>
      <Layout>
        <div className="flex flex-col pb-4 border-b-[1px] gap-4 justify-center items-center sm:flex-row sm:justify-between">
          <div className="flex w-full flex-col items-center sm:flex-row">
            <div className="max-w-fit mr-4 px-4 py-1 rounded bg-lightblue flex justify-center items-center text-blue text-sm">
              북극곰을 위한 챌린지
            </div>
            <h3>{mainChallenge?.title}</h3>
          </div>
          {mainChallenge && <CertifyPost user_id={session?.user_id} challengeId={mainChallenge.challenge_Id} />}
        </div>
        <CertifyList />
      </Layout>
    </>
  );
}
