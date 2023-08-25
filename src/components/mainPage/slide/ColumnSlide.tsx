'use client'
import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Image from 'next/image';

import Button from '@/components/common/Button';


import Slide from './Slide';
import nextIcon from '../../../../public/rightArrow.svg'

import type { NatureStory } from '@/types/dataType';
const data: NatureStory[] = [
  {
    post_id: "1",
    created_at: "2023.2.3",
    category: "youtube",
    url: 'Q414VnDOZNk',
    tag: '#asvdg',
  },
  {
    post_id: "2",
    created_at: "2023.2.3",
    category: "youtube",
    url: 'Q414VnDOZNk',
    tag: '#asvdg',
  },
  {
    post_id: "3",
    created_at: "2023.2.3",
    category: "youtube",
    url: 'Q414VnDOZNk',
    tag: '#asvdg',
  },
  {
    post_id: "4",
    created_at: "2023.2.3",
    category: "youtube",
    url: 'Q414VnDOZNk',
    tag: '#asvdg',
  },
  {
    post_id: "5",
    created_at: "2023.2.3",
    category: "youtube",
    url: 'Q414VnDOZNk',
    tag: '#asvdg',
  },
];
const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
const videoId = 'Q414VnDOZNk'
export default function ContentSlide() {
  const [videoInfo, setVideoInfo] = useState<any>(null)

  useEffect(() => {
    axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`).then((res: any) => {
      const videoData = res.data.items[0]
      setVideoInfo(videoData)
      console.log(videoData)
    })
  }, [])
  return (
    <div className=" border-b-2 mt-20 pb-20 my-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Contents</p>
      <h2 className="mt-4">{videoInfo.snippet. }</h2>
      <div className='flex gap-10 mt-20'>

        {
          <iframe
            width="690"
            height="420"
            rel="0"
            src={`https://www.youtube.com/embed/${videoId}?amp;loop=1&modestbranding=1&rel=0&fs=0`}
          ></iframe>
        }

        <div className='my-auto'>
          <p className='mb-4'>YOUTUBE</p>
          <h1 className='text-2xl mb-[14px]'>{`녹아내리는 북극곰 터전..."2035년 해빙 사라질 것"`}</h1>
          <div className='flex  text-black opacity-50  mb-9' >
            <p >Updated</p>
            &nbsp;
            <span>|</span>
            &nbsp;
            <p>2023.08.18(금)</p>
          </div>
          <Button btnType='borderBlack' size='large' rounded={true} >
            <p>자세히 보기</p>
            <Image className='hover:bg-white' src={nextIcon} alt='Rightarrow' />
          </Button>
        </div>
      </div>
      <div className={'flex justify-center items-center mt-10 gap-x-6 '}>
        <Slide showContentNum={4} type='column' contents={data}></Slide>
      </div>
    </div>
  )
}
//{ children, btnType, size = 'medium', onClick, rounded, buttonStyle, disabled }