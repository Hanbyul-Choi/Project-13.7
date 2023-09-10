import React from 'react'

import Image from 'next/image';
import Link from 'next/link';

import { getNatureStory } from '@/app/api/nature-story';

import list from '../../../public/list.svg'

type NatureDetailProps = {
  postId: string
}

export default async function NatureDetail({ postId }: NatureDetailProps) {
  const datas = await getNatureStory();
  const { category, content, created_at, post_id, video_url, tag, img_url, title } = datas.filter((item) => item.post_id === postId)[0]

  return (
    <section className='w-[966px] h-[1188px] mx-auto m-12'>
      <p className='w-[92px] py-auto h-8 text-center bg-sub6 font- mb-4'>{category}</p>
      <h1>{title}</h1>
      <div className='py-4 flex gap-2 border-b-white'>
        <p>관리자</p>
        <span>|</span>
        <p>작성일</p>
        <p>{created_at.slice(0, 10).replaceAll('-', '.')}</p>
      </div>
      <div className="">
        {
          category === "youtube" ?
            <iframe rel="0" allowFullScreen src={`https://www.youtube.com/embed/${video_url}?amp;loop=1&modestbranding=1&rel=0&fs=1`} className="w-full h-[500px]" />
            :
            <Image width={690} height={420} src={img_url} alt="contentImg" />
        }
      </div>
      <Link href='/nature-story?category=all' className='flex'>
        <Image src={list} alt='backToListImg' />
        <p>목록보기</p>
      </Link>
    </section>
  )
}
