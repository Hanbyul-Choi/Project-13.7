import React from 'react'

import Image from 'next/image'

import imgSrc from '../../../../public/dog.jpg'

import type { Suggestion } from '@/types/dataType'

interface Props {
  data: Suggestion
}
//{require('../../../../public/dog.jpg').default}
export default function IdeaSlideCard({ data }: Props) {
  return (
    <>
      <Image src={imgSrc} objectFit='cover' alt='' className='h-[339px] font-normal' />
      <div className='flex text-[14px] weight' >
        <p className='text-[18px]'>{data.user_id}</p>
        <p>{data.created_at}</p>
      </div>
      <h2 >{data.title}</h2>
      <h3>{data.content}</h3>
      <h3>{data.commends}</h3>
    </>
  )
}
