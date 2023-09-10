import React from 'react';

import { Layout } from '@/components/common';
import { Content, SideBar } from '@/components/nature-story';

export default function NaturePage({ searchParams }: { searchParams: { category: string | undefined } }) {
  return (
    <>
      <div className={`w-full h-[400px] bg-[#white] bg-[url('/nature-banner.png')] bg-no-repeat bg-center border-t-2 border-t-black/.5 mb-6`} />
      <Layout>
        <div className="w-full h-[1px] bg-opacityblack mt-10" />
        <section className="flex mt-20">
          <SideBar searchParams={searchParams.category} />
          <Content searchParams={searchParams.category} />
        </section>
      </Layout>
    </>
  );
}
