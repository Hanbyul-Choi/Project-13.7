import React from 'react';

import { Layout } from '@/components/common';
import { Content, SideBar } from '@/components/nature-story';

import type { Props } from '@/types/page-props.type';

export default function NaturePage({ params }: Props) {
  return (
    <>
      <div className={`w-full sm:h-[400px] h-[600px] bg-[#white] sm:bg-[url('/nature-banner.png')] bg-[url('/nature-banner-mo.png')] bg-no-repeat bg-center border-t-2 border-t-black/.5 mb-6`} />
      <Layout>
        <div className="w-full h-[1px] bg-opacityblack mt-10" />
        <section className="flex mt-20">
          <SideBar params={params} />
          <Content />
        </section>
      </Layout>
    </>
  );
}
