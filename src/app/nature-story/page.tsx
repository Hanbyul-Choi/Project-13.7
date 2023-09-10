import React from 'react';

import { Layout } from '@/components/common';
import { Content, SideBar } from '@/components/nature-story';

export default function NaturePage({ searchParams }: { searchParams: { category: string | undefined } }) {
  return (
    <>
      <div className={`w-full sm:h-[400px] h-[600px] bg-[#white] sm:bg-[url('/nature-banner.png')] bg-[url('/nature-banner-mo.png')] bg-no-repeat bg-center border-t-2 border-t-black/.5 mb-6`} />
      <Layout>
        <div className="w-full h-[1px] bg-opacityblack mt-10" />
        <section className="flex mt-20">
          <SideBar searchParams={searchParams.category} />
          <Content />
        </section>
      </Layout>
    </>
  );
}
