import React from 'react';

import { CertifyList, CertifyPost } from '@/components/challenge-certify';
import { Layout } from '@/components/common';

export default function CertifyPage() {
  // 이달의 챌린지(mainChallenge / isCompleted / false)에서 title 값 불러오기
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="flex">
          <div className="max-w-fit px-4 py-1 rounded bg-lightblue mt-4 mr-2 text-blue text-sm">북극곰을 위한 챌린지</div>
          <h3>대중교통 이용하기</h3>
        </div>
        <CertifyPost />
      </div>
      <CertifyList />
    </Layout>
  );
}
