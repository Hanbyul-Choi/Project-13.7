
import React from 'react'

import Image from 'next/image'

import playBtn from '../../../../public/playBtn.svg'



import type { NatureStory } from '@/types/db.type'


interface Props {
  data: NatureStory
}


export default function ColumnSlideCard({ data }: Props) {

  return (

    <article>
      <div className='relative'>
        <div className='w-[228px] h-[140px] '>
          <img src={data.img_url} style={{ objectFit: "cover" }} alt='natureStoryImg' />
        </div>
        <div className='absolute inset-0 flex justify-center items-center'>
          <Image src={playBtn} alt='play' />
        </div>
      </div>
      <p className='text-black opacity-50 text-sm'>{data.category}</p>
      <h1 className='text-lg font-bold'>{data.title}</h1>
    </article>

  )
}
