'use client';
import React, { useEffect, useRef, useState } from 'react';

import { v4 } from 'uuid';

import ColumnSlideCard from './ColumnSlideCard';
import IdeaSlideCard from './IdeaSlideCard';
import SlideBtn from './slideBtn';

import type { NatureStory, Suggestion } from '../../../types/db.type';
import type { Tables } from '@/types/supabase.type';
interface Props {
  showContentNum: number;
  type: 'idea' | 'column';
  contents: Tables<'challengeSuggestion'>[] | Tables<'natureStory'>[];
  onClickHandler?: (i: number) => void;
}

type innerMatch = {
  size: number[];
  containerWidth: string;
  gap: string;
  contentWidth: string;
};

type Match = Record<string, innerMatch>;

export default function Slide({ showContentNum = 3, contents, type, onClickHandler = () => { } }: Props) {
  const slideObj: Match = {
    idea: {
      size: [343, 85.5],
      containerWidth: 'w-[300px] sm:max-lg:w-[100vw] lg:w-[1199px]',
      gap: 'gap-[128.5px] sm:gap-[85.5px]',
      contentWidth: 'w-[300px] sm:w-[343px]',
    },
    column: {
      size: [228, 24],
      containerWidth: 'w-[228px] sm:max-lg:w-[100vw] lg:w-[983px]',
      gap: 'gap-[24px]',
      contentWidth: 'w-[200px] w-[228px]',
    },
  };

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
        <div key={v4()} className={`${slideObj[type].containerWidth} `}>
          <div className={`${slideObj[type].contentWidth} `}>
            <button onClick={() => onClickHandler(i)}>{type === 'idea' ? <IdeaSlideCard data={item as Suggestion} /> : <ColumnSlideCard data={item as NatureStory} />}</button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex items-center relative w-[300px] sm:max-lg:w-[100vw] lg:w-[1199px]">
      {
        type !== 'idea' && (
          <div className='my-auto mr-2'>
            <SlideBtn direction="prev" onClick={prevSlide} />
          </div>
        )
      }
      <div className={` overflow-x-hidden flex `}>
        <div className={`flex ${slideObj[type].containerWidth} ${slideObj[type].gap}`} ref={slideRef}>
          {renderContent()}
        </div>
        {
          type === 'idea' && (
            <div className={'flex gap-4 top-[-80px] sm:top-[-105px] right-0 absolute'}>
              <SlideBtn direction="prev" onClick={prevSlide} />
              <SlideBtn direction="next" onClick={nextSlide} />
            </div>
          )
        }
      </div>
      {
        type !== 'idea' && (
          <div className='my-auto ml-2'>
            <SlideBtn direction="next" onClick={nextSlide} />
          </div>
        )
      }
    </div>
  );
}
