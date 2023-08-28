import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import imgSrc from '../../../../public/dog.jpg'
import fullHeart from '../../../../public/fullHeart.svg'

import type { Suggestion } from '@/types/db.type';

interface Props {
  data: Suggestion;
}

export default function IdeaSlideCard({ data }: Props) {
  const createdAt = data.created_at;
  const date = createdAt.match(/(\d{4}-\d{2}-\d{2})/);
  return (
    <div className="flex flex-col gap-3 hover:drop-shadow-lg">
      <Link href={`/idea/${data.post_id}`}>
        <Image src={imgSrc} objectFit="cover" alt="개야" className="h-[339px] font-normal" />
        <div className="flex text-black opacity-50 text-sm">
          <p>{data.users?.nickname}</p>
          &nbsp;
          <span>|</span>
          &nbsp;
          <p>{date ? date[1] : ''}</p>
        </div>
        <div>
          <h2 className="text-lg">{data.title}</h2>
          <h3 className="text-black opacity-50 text-sm">{data.content}</h3>
        </div>
        <div className='flex items-center'>
          <Image src={fullHeart} alt="heart" />
          <h3 className='text-sm text-green'>추천수 {data.likes}</h3>
        </div>
        <div />
      </Link>
    </div>
  );
}
