'use client'
import React, { useEffect, useState } from 'react'

import Image from 'next/image';

import { getYouTubeInfo } from '@/app/api/youtube-api';
import { Button } from '@/components/common';


import Slide from './Slide';
import nextIcon from '../../../../public/rightArrow.svg'

import type { NatureStory } from '@/types/db.type';
const data: NatureStory[] = [
  {
    post_id: "1",
    created_at: "2023.2.3",
    category: "youtube",
    video_url: '2ZzcatQQ6lU',
    title: "바다가 얼기를 기다리는 어미 북극곰의 새끼 지키기 대작전",
    img_url: 'https://i.ytimg.com/vi/2ZzcatQQ6lU/mqdefault.jpg',
    tag: '#asvdg',
    content: ''
  },
  {
    post_id: "2",
    created_at: "2023.2.3",
    category: "youtube",
    video_url: '0FvubROF0gk',
    title: "지구 온도가 상승할 때 마다 가까워지는 멸종 | 심각한 지구 온난화",
    img_url: 'https://i.ytimg.com/vi/0FvubROF0gk/mqdefault.jpg',
    tag: '#asvdg',
    content: ''
  },
  {
    post_id: "3",
    created_at: "2023.2.3",
    category: "column",
    video_url: 'Q414VnDOZNk',
    title: "기후변화·지구온난화·기후위기…무엇이 맞을까",
    img_url: 'https://flexible.img.hani.co.kr/flexible/normal/970/646/imgdb/original/2021/0108/20210108502584.jpg',
    tag: '#asvdg',
    content: ''
  },
  {
    post_id: "4",
    created_at: "2023.2.3",
    category: "youtube",
    video_url: 'Q414VnDOZNk',
    title: "북극곰이 아프대요",
    img_url: 'https://i.ytimg.com/vi/Q414VnDOZNk/mqdefault.jpg',
    tag: '#asvdg',
    content: ''
  },
  {
    post_id: "5",
    created_at: "2023.2.3",
    category: "youtube",
    video_url: 'Q414VnDOZNk',
    title: "북극곰이 아프대요",
    img_url: 'https://i.ytimg.com/vi/Q414VnDOZNk/mqdefault.jpg',
    tag: '#asvdg',
    content: ''
  },
];

const videoId = 'Q414VnDOZNk'
export default function ContentSlide() {
  const [selectedItem, setSelectedItem] = useState<NatureStory>(data[0])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getYouTubeInfo(videoId);
    }
    fetchData()
  }, [])

  const onClickItem = (id: string) => {
    const pickData = data.filter(data => data.post_id === id)
    setSelectedItem(pickData[0])
  }
  //db에 저장된 데이터 불러와서 적용, props전달
  return (
    <div className=" border-b-2 mt-20 pb-20 my-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Contents</p>
      <h2 className="mt-4">멸종위기 동물들의 생활</h2>

      <div className='flex gap-10 mt-20'>
        {selectedItem.category === "youtube" ?
          <div className='w-[690px] h-[420px]'>
            <iframe
              width={690}
              height={420}
              rel="0"
              src={`https://www.youtube.com/embed/${selectedItem.video_url}?amp;loop=1&modestbranding=1&rel=0&fs=0`}
            />
          </div>
          :
          <div className='w-[690px] h-[420px] overflow-hidden'>
            <Image width={690} height={420} src={selectedItem.img_url} alt='natureStroyImg' />
          </div>
        }

        <div className='my-auto'>
          <p className='mb-4'>{selectedItem.category}</p>
          <h1 className='text-2xl mb-[14px]'>{selectedItem.title}</h1>
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
        <Slide showContentNum={4} type='column' contents={data} onClickHandler={onClickItem}></Slide>
      </div>
    </div>
  );
}
//{ children, btnType, size = 'medium', onClick, rounded, buttonStyle, disabled }