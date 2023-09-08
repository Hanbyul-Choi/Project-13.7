import React from 'react';


import { Layout } from '@/components/common';
import { IdeaList } from '@/components/idea-page';

export default function IdeaPage() {
  return (
    <div>
      <div className={`w-full h-[400px] bg-[#white] bg-[url('/idea-banner.png')] bg-no-repeat bg-center border-[1px] border-y-black/.5 mb-6`} />
      <Layout>
        <IdeaList />
      </Layout>
    </div>
  );
}
