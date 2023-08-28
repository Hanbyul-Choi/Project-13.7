import React from 'react';

import { Layout } from '../common';

import { Content, SideBar } from '.';

export function NaturePage() {
  return (
    <Layout>
      <div className="flex justify-center items-center w-full mt-10 px-[32.25rem] py-[5rem] bg-sub3">
        <h3 className="whitespace-nowrap">환경 이야기 🌱 </h3>
      </div>
      <div className="w-full h-[1px] bg-opacityblack mt-10" />
      <section className="flex mt-20">
        <SideBar />
        <Content />
      </section>
    </Layout>
  );
}
