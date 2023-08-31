import React from 'react';

import Image from 'next/image';

import { Button } from '@/components/common';
import Review from '@/components/idea-detail-page/Review';
import SingleLayout from '@/components/layout/SingleLayout';
// import useLike from '@/hooks/useLike.hook';

import defaultImage from '../../../../public/defaultProfileImage.jpeg';
import heartIcon from '../../../../public/heart.svg';

import type { Props } from '@/types/Props.type';

export default function page({ params: { slug } }: Props) {
  // const { onClickLike } = useLike(item);

  return (
    <SingleLayout title="챌린지 응원하기🙌" size={true}>
      {/* 챌린지 아이디어 타이틀 */}
      <h4>{slug}모두 함께 일회용품 사용 줄여보아요</h4>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <Image src={defaultImage} width={70} height={70} alt="Default Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
          </div>
          <div>
            {/* userId */}
            <p className="leading-[150%] text-[#888889] mb-[4px]">{slug}hannah.G</p>
            {/* user등급 */}
            <p className="text-lg font-bold leading-[140%]">{slug}북극곰마스터</p>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <p className="text-green leading-[150%] text-sm">추천수 {slug}</p>
          <Button btnType="green" size="small">
            {/* <Button btnType="green" size="small" onClick={onClickLike}> */}
            <Image src={heartIcon} width={16} height={16} alt="Like this idea" />
            추천하기
          </Button>
        </div>
      </div>
      <hr className="w-full my-10 border border-[#bdbdbd]" />
      <div className="flex justify-center items-center "></div>
      <div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg leading-[140%] font-medium w-[83px]">챌린지 내용</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[85%] ml-5">{slug}텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요!</p>
        </div>
        <div className="flex flex-row justify-center items-center my-6">
          <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">챌린지 물품</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[85%]">{slug}텀블러</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">참여비용</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd]">25그루</p>
          <p className="text-sm text-nagative ml-4">*물품비용을 제외한 나머지 금액은 모두 환경을 위해 기부됩니다</p>
        </div>
      </div>
      <hr className="w-full my-20 border border-blue" />

      <Review slug={slug} />

    </SingleLayout>
  );
}
