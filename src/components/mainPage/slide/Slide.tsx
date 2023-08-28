'use client';
import React, { useEffect, useRef, useState } from 'react';

import ColumnSlideCard from './ColumnSlideCard';
import IdeaSlideCard from './IdeaSlideCard';
import SlideBtn from './slideBtn';

import type { NatureStory, Suggestion } from '../../../types/db.type'

interface Props {
  showContentNum: number;
  type: "idea" | "column"
  contents: (Suggestion | NatureStory)[]
  onClickHandler?: (id: string) => void
}

type innerMatch = {
  size: number[];
  containerWidth: string;
  gap: string;
  contentWidth: string;
}

type Match = Record<string, innerMatch>;

export default function Slide({
  showContentNum = 3,
  contents,
  type,
  onClickHandler = () => { }
}: Props) {

  const slideObj: Match = {
    idea: {
      size: [343, 85.5],
      containerWidth: 'w-[1199px]',
      gap: 'gap-[85.5px]',
      contentWidth: 'w-[343px]',
    },
    column: {
      size: [228, 24],
      containerWidth: 'w-[983px]',
      gap: 'gap-[24px]',
      contentWidth: 'w-[228px]',

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

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${currentSlide * (slideObj[type].size[0] + slideObj[type].size[1])}px)`;
      if (currentSlide > lastSlide) {
        slideRef.current.style.transition = '';
        slideRef.current.style.transform = `translateX(0px)`;
        setCurrentSlide(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLastSlide, slideRef, currentSlide, type]);

  const renderContent = () => {
    return cloneContents.map((item, i) => {
      return (
        <div key={i} className={`${slideObj[type].containerWidth} `} >
          <div className={`${slideObj[type].contentWidth} `} >
            <button onClick={() => onClickHandler(item.post_id)}>
              {
                type === 'idea' ? <IdeaSlideCard data={item as Suggestion} /> : <ColumnSlideCard data={item as NatureStory} />
              }
            </button>
          </div>
        </div>)
    })
  }

  return (
    <div className='flex items-center relative'>
      <div
        className={` overflow-x-hidden  `}>
        <div
          className={`flex ${slideObj[type].containerWidth} ${slideObj[type].gap} `}
          ref={slideRef}>
          {renderContent()}
        </div>
        <div className={type === "idea" ? 'flex gap-6 top-[-105px] right-0 absolute' : 'flex absolute left-[-105px] top-[50px]  gap-[1030px]'}>
          <SlideBtn direction='prev' onClick={prevSlide} />
          <SlideBtn direction='next' onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
}
