import React from 'react';

import Layout from '@/components/common/Layout';
import IdeaList from '@/components/ideaPage/IdeaList';
export default function IdeaPage() {
  return (
    <Layout>
      <div className="w-full h-[200px] rounded-lg bg-sub3 flex justify-center items-center mt-10">
        <h3>다음 챌린지 투표하기 🙌</h3>
      </div>
      <IdeaList />
    </Layout>
  );
}
