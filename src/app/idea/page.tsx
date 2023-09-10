import React from 'react';

import { Layout } from '@/components/common';
import { IdeaList } from '@/components/idea-page';

export default function IdeaPage() {
  return (
    <div>
      <div className={`w-full sm:h-[400px] h-[600px] bg-[#white] sm:bg-[url('/idea-banner.png')]  bg-[url('/idea-banner-mo.png')]  bg-no-repeat bg-center border-[1px] border-y-black/.5 mb-6`} />
      <Layout>
        <IdeaList />
      </Layout>
    </div>
  );
}
