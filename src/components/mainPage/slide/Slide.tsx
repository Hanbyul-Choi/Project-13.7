'use client'
import React, { useEffect, useRef, useState } from 'react'

import SlideBtn from './slideBtn';

import type { Suggestion } from '@/types/dataType';




interface Props {
  showContentNum: number;
  space: number;
  contents: Suggestion[]
  contentWidth: number;
  onClickHandler?: () => void
}


export default function Slide({
  showContentNum = 3,
  space = 1,
  contents,
  contentWidth = 100,
}: Props) {

  let overContents = true;
  if (contents.length <= showContentNum) {
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
  const sliceWidth = contentWidth * showContentNum + space * (showContentNum - 1);
  const isLastSlide = currentSlide === TOTAL_SLIDES + 1 - showContentNum;

  const nextSlide = () => {
    setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    if (slideRef.current) {
      if (isLastSlide) {
        slideRef.current.style.transition = "";
        slideRef.current.style.transform = `translateX(0px)`;
      } else {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${currentSlide * (contentWidth + space)}px)`;
      }
    }
  }, [isLastSlide, slideRef, currentSlide, contentWidth, space])

  const renderContent = () => {
    return cloneContents.map(item => (
      <div key={item.post_id} className={`w-[${contentWidth}px]`} >
        <div className={`w-[${contentWidth}px] h-[463px] bg-blue`} />
      </div>
    ))
  }

  const containerWidth = `${((contentWidth * showContentNum) / 100) * (100 + space * (showContentNum - 1))}`

  return (
    <div className='flex justify-center items-center'>
      <div
        className={`w-[${containerWidth}%] overflow-hidden relative`}>
        <div
          className={`flex w-[${sliceWidth}px] gap-[${space}px]`}
          ref={slideRef}>
          {renderContent()}
        </div>
        <div className='flex'>
          <SlideBtn type='prev' onClick={prevSlide} />
          <SlideBtn type='next' onClick={nextSlide} />
        </div>
      </div>
    </div >
  );
}