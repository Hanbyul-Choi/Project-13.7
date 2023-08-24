'use client'
import React, { useEffect, useRef, useState } from 'react'



import IdeaSlideCard from './IdeaSlideCard';
import SlideBtn from './slideBtn';

import type { Suggestion } from '@/types/dataType';




interface Props {
  showContentNum: number;
  type: "idea" | "column"
  contents: Suggestion[]
  onClickHandler?: () => void
}

type innerMatch = {
  size: number[]
  containerWidth: string;
  gap: string;
  contentWidth: string;
  contentHeight: string;
}

type Match = Record<string, innerMatch>;

export default function Slide({
  showContentNum = 3,
  contents,
  type
}: Props) {

  const slideObj: Match = {
    idea: {
      size: [343, 85.5],
      containerWidth: 'w-[1199px]',
      gap: 'gap-[85.5px]',
      contentWidth: 'w-[343px]',
      contentHeight: 'h-[463px]'
    },
    column: {
      size: [228, 24],
      containerWidth: 'w-[983px]',
      gap: 'gap-[24px]',
      contentWidth: 'w-[228px]',
      contentHeight: 'h-[192px]'
    }
  }



  let overContents = true;
  if (contents && contents.length <= showContentNum) {
    overContents = false;
  }



  const [currentSlide, setCurrentSlide] = useState(0);

  const cloneContents = [...contents];

  if (overContents) {
    for (let i = 0; i < showContentNum; i += 1) {
      cloneContents.push(contents[i]);
    }
  }
  const slideRef = useRef<HTMLDivElement | null>(null);

  const TOTAL_SLIDES = cloneContents.length - 1;
  const isLastSlide = currentSlide === TOTAL_SLIDES + 1 - showContentNum;
  const lastSlide = TOTAL_SLIDES - showContentNum + 1;
  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };
  // ${slideObj[type].containerWidth}
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide * (slideObj[type].size[0] + slideObj[type].size[1])}px)`;
      if (currentSlide > lastSlide) {
        slideRef.current.style.transition = "";
        slideRef.current.style.transform = `translateX(0px)`;
        setCurrentSlide(0)
      }

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastSlide, slideRef, currentSlide, type])

  const renderContent = () => {
    return cloneContents.map(item => {
      return (

        <div key={item.post_id} className={`${slideObj[type].containerWidth}`} >
          <div className={`${slideObj[type].contentWidth} ${slideObj[type].contentHeight} `} >

            <IdeaSlideCard data={item} />

          </div>
        </div>)

    })
  }
  //type==="idea"?'flex gap-6 top-[-105px] right-0 absolute':flex absolute left-[-105px] top-[50px]  gap-[1030px]


  return (
    <div className='flex items-center relative'>
      <div
        className={` overflow-x-hidden  `}>
        <div
          className={`flex ${slideObj[type].containerWidth} ${slideObj[type].gap}`}
          ref={slideRef}>
          {renderContent()}
        </div>
        <div className='flex gap-6 top-[-105px] right-0 absolute'>
          <SlideBtn direction='prev' onClick={prevSlide} disabled={currentSlide === 0} />
          <SlideBtn direction='next' onClick={nextSlide} disabled={false} />
        </div>
      </div>
    </div >
  );
}