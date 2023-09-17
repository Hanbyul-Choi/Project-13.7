import React from 'react';

import { Layout } from '@/components/common';
import Banner from '@/components/common/Banner';
import { IdeaList } from '@/components/idea-page';

export default function IdeaPage() {
  return (
    <div>
      <div className="px-100w-full mx-auto md:max-w-[77rem] border-y-[1px]">
        <Banner challenge="next challenge" title="다음 챌린지 투표하기" />
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
