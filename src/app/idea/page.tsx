import React from 'react';

import { Layout } from '@/components/common';
import { IdeaList } from '@/components/idea-page';

export default function IdeaPage() {
  return (
    <div>
      <div className="px-100w-full mx-auto md:max-w-[77rem] border-y-[1px]">
        <div
          className={`float-left ml-2 w-full md:h-[400px] h-[300px] bg-[#white] md:bg-[url('/idea-banner-text.png')] bg-[url('/banner-text-mo.png')] bg-no-repeat bg-left mb-6`}
        />
        <div
          className={`w-full md:h-[400px] h-[600px] bg-[#white] md:bg-[url('/idea-banner.png')] bg-[url('/idea-banner-mo.png')] bg-no-repeat bg-center mb-6`}
        />
      </div>
      <Layout>
        <IdeaList />
      </Layout>
    </div>
  );
}
