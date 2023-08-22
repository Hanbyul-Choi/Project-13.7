import React from 'react';

import Link from 'next/link';

import Button from '@/components/common/Button';
import Layout from '@/components/common/Layout';
import IdeaList from '@/components/ideaPage/IdeaList';
export default function IdeaPage() {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="w-full h-[200px] rounded-lg bg-sub3 flex justify-center items-center">
          <h3>다음 챌린지 투표하기 🙌</h3>
        </div>
        <div className="w-full flex justify-end mt-10 pb-6 border-b-2 border-opacityblack">
          <Link href="/idea/post">
            <Button btnType="black" size="large">
              챌린지 제안하기
            </Button>
          </Link>
        </div>
      </div>
      <IdeaList />
    </Layout>
  );
}
