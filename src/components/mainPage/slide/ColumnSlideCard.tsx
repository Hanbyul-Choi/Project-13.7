
import React from 'react'



import type { NatureStory } from '@/types/dataType'


interface Props {
  data: NatureStory
}


export default function ColumnSlideCard({ data }: Props) {

  return (
    <article>
      <div className='w-[228px] h-[140px] '>

      </div>

      <p className='text-black opacity-50 text-sm'></p>
      <h1 className='text-lg font-bold'></h1>
    </article>
  )
}
