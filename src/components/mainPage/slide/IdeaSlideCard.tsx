import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import imgSrc from '../../../../public/dog.jpg'

import type { Suggestion } from '@/types/dataType'

interface Props {
  data: Suggestion
}

export default function IdeaSlideCard({ data }: Props) {
  const createdAt = data.created_at
  const date = createdAt.match(/(\d{4}-\d{2}-\d{2})/)
  return (
    <div className='flex flex-col gap-3 hover:drop-shadow-lg'>
      <Link href={`/idea/${data.post_id}`}>
        <Image src={imgSrc} objectFit='cover' alt='' className='h-[339px] font-normal' />
        <div className='flex  text-black opacity-50 text-sm' >
          <p >{data.users?.nickname}</p>
          &nbsp;
          <span>|</span>
          &nbsp;
          <p>{date ? date[1] : ""}</p>
        </div>
        <div>
          <h2 className='text-lg'>{data.title}</h2>
          <h3 className='text-black opacity-50 text-sm'>{data.content}</h3>
        </div>
        <div className='flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M7.76333 14.44L7.75867 14.438L7.744 14.43C7.65819 14.3828 7.57307 14.3344 7.48867 14.2847C6.47387 13.6817 5.52552 12.9733 4.65933 12.1714C3.12533 10.74 1.5 8.61605 1.5 6.00005C1.5 4.04805 3.14267 2.50005 5.12533 2.50005C5.6765 2.49735 6.22119 2.61894 6.71888 2.85578C7.21657 3.09263 7.65447 3.43863 8 3.86805C8.3456 3.43854 8.7836 3.09249 9.28142 2.85564C9.77924 2.61879 10.3241 2.49725 10.8753 2.50005C12.8573 2.50005 14.5 4.04805 14.5 6.00005C14.5 8.61671 12.8747 10.7407 11.3407 12.1707C10.4745 12.9727 9.52614 13.6811 8.51133 14.284C8.42693 14.3339 8.34181 14.3826 8.256 14.43L8.24133 14.438L8.23667 14.4407L8.23467 14.4414C8.16237 14.4797 8.08181 14.4997 8 14.4997C7.91819 14.4997 7.83763 14.4797 7.76533 14.4414L7.76333 14.44Z" fill="#34C184" />
          </svg>
          <h3 className='text-sm text-green'>추천수 {data.likes}</h3>
        </div>
        <div />
      </Link>
    </div>
  )
}
