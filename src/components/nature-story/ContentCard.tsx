import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import type { Tables } from '@/types/supabase.type'


type ContentProps = {
  data: Tables<"natureStory">
  index: number
}



export default function ContentCard({ data, index }: ContentProps) {
  const { category, created_at, img_url, post_id, tag, title } = data
  return (
    <Link href={`/nature-story/${post_id}`} key={post_id} className="flex flex-col gap-4">
      <Image src={img_url} alt={title} />
      <div className="w-[316px] h-[178px] bg-sub3 text-center"> 이미지 영역</div>
      <div className="flex gap-2  opacity-50 items-center mt-4">
        <p className="text-lg">{category}</p>
        <p className="text-lg">|</p>
        <p>{created_at.slice(0, 10).replaceAll('-', '.')}</p>
      </div>
      <h5 className="text-ellipsis overflow-hidden whitespace-nowrap">{title}</h5>
      <div className="flex gap-2">
        {tag.split(' ').map((tag, i) => (
          <p className={`text-lg ${i === 0 ? (index % 2 == 0 ? 'text-blue' : 'text-orange') : 'opacity-50'}`} key={tag}>
            #{tag}
          </p>
        ))}
      </div>
    </Link>
  )
}
