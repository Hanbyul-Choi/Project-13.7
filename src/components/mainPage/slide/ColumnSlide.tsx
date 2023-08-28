'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image';
import Link from 'next/link';

import { getNatureStory } from '@/app/api/nature-stroty';
import { Button } from '@/components/common';


import Slide from './Slide';
import nextIcon from '../../../../public/rightArrow.svg'

import type { NatureStory } from '@/types/db.type';


export default function ContentSlide() {
  const [contentData, setContentData] = useState<NatureStory[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const natureStoryData = await getNatureStory()
      setContentData(natureStoryData)
      setSelectedItem(natureStoryData[0])
    }
    fetchData()
  }, [])
  const [selectedItem, setSelectedItem] = useState<NatureStory>(contentData[0])
  const onClickItem = (id: string) => {
    if (!contentData) return
    const pickData = contentData.filter(data => data.post_id === id)
    setSelectedItem(pickData[0])
  }
  //db에 저장된 데이터 불러와서 적용, props전달
  return (
    <div className=" border-b-2 mt-20 pb-20 my-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Contents</p>
      <h2 className="mt-4">멸종위기 동물들의 생활</h2>

      <div className='flex gap-10 mt-20'>
        {selectedItem?.category === "youtube" ?
          <div className='w-[690px] h-[420px]'>
            <iframe
              width={690}
              height={420}
              rel="0"
              src={`https://www.youtube.com/embed/${selectedItem?.video_url}?amp;loop=1&modestbranding=1&rel=0&fs=0`}
            />
          </div>
          :
          <div className='w-[690px] h-[420px] overflow-hidden'>
            <img width={690} height={420} src={selectedItem?.img_url} alt='natureStroyImg' />
          </div>
        }

        <div className='my-auto'>
          <p className='mb-4'>{selectedItem?.category}</p>
          <h1 className='text-2xl mb-[14px]'>{selectedItem?.title}</h1>
          <div className='flex  text-black opacity-50  mb-9' >
            <p >Updated</p>
            &nbsp;
            <span>|</span>
            &nbsp;
            <p>2023.08.18(금)</p>
          </div>
          <Link href={`/naturestory/${selectedItem?.post_id}`}>
            <Button btnType='borderBlack' size='large' rounded={true} >
              <p>자세히 보기</p>
              <Image className='hover:bg-white' src={nextIcon} alt='Rightarrow' />
            </Button>
          </Link>
        </div>
      </div>
      <div className={'flex justify-center items-center mt-10 gap-x-6 '}>
        <Slide showContentNum={4} type='column' contents={contentData} onClickHandler={onClickItem}></Slide>
      </div>
    </div>
  );
}
