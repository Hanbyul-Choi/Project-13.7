import React from 'react';

import { Layout } from '@/components/common';
import { Content, SideBar } from '@/components/nature-story';

export default function NaturePage({ searchParams }: { searchParams: { category: string | undefined } }) {
  return (
    <>
      <div className="px-100w-full mx-auto md:max-w-[77rem] border-y-[1px]">
        <div
          className={`float-left ml-2 w-full md:h-[400px] h-[300px] bg-[#white] md:bg-[url('/nature-banner-text.png')] bg-[url('/banner-text-mo.png')] bg-no-repeat bg-left mb-6`}
        />
        <div
          className={`w-full md:h-[400px] h-[600px] bg-[#white] md:bg-[url('/nature-banner.png')] bg-[url('/nature-banner-mo.png')] bg-no-repeat bg-center mb-6`}
        />
      </div>
      <Layout>
        <div className="w-full h-[1px] bg-opacityblack mt-10" />
        <section className="flex gap-8 mt-20">
          <SideBar searchParams={searchParams.category} />
          <Content searchParams={searchParams.category} />
        </section>
      </Layout>
    </>
  );
}
