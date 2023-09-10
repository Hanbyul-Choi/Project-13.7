import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getNatureStory } from '@/app/api/nature-story';

import list from '../../../public/list.svg';
import { Layout } from '../common';

type NatureDetailProps = {
  postId: string;
};

export default async function NatureDetail({ postId }: NatureDetailProps) {
  const data = await getNatureStory();
  const { category, content, created_at, video_url, img_url, title } = data.filter(item => item.post_id === postId)[0];
  console.log(content);

  return (
    <Layout>
      <section>
        <p className="w-fit py-1 px-4 text-center bg-sub2 mb-4 rounded text-sub6">{category.toUpperCase()}</p>
        <h1>{title}</h1>
        <div className="w-full h-[2px] bg-blue mt-6" />
        <div className="py-4 flex gap-2 border-b-white opacity-50">
          <p>지구 온도 수호자</p>
          <span>|</span>
          <p>작성일</p>
          <p>{created_at.slice(0, 10).replaceAll('-', '.')}</p>
        </div>
        <div className="w-full h-[1px] bg-black opacity-25 mb-20" />
        <div className="max-w-5xl m-auto">
          {category === 'youtube' ? (
            <iframe
              rel="0"
              allowFullScreen
              src={`https://www.youtube.com/embed/${video_url}?amp;loop=1&modestbranding=1&rel=0&fs=1`}
              className="w-full aspect-video"
            />
          ) : (
            <>
              <div className="w-full aspect-video relative">
                <Image fill src={img_url} alt="contentImg" className="mx-auto object-cover" />
              </div>
              <article>
                <p>{content}</p>
              </article>
            </>
          )}
        </div>
        <div className="w-full h-[1px] bg-black opacity-50 mt-20" />
        <Link href="/nature-story?category=all" className="flex gap-1 mx-auto mt-20 px-8 py-2 border-[1px] w-fit rounded-lg border-black">
          <Image src={list} alt="backToListImg" />
          <h6>목록보기</h6>
        </Link>
      </section>
    </Layout>
  );
}
