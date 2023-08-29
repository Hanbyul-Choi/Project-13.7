'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/common';

import defaultImage from '../../../public/defaultProfileImage.jpeg';
import heartIcon from '../../../public/heart.svg';
import { supabase } from '../../../supabase/supabaseConfig';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { Suggestion } from '@/types/db.type';

function IdeaDetail({ slug }: DetailProps) {
  const [ideaData, setIdeaData] = useState<Suggestion>();

  const handleGetChallengeIdeaCommentData = async () => {
    const { data, error } = await supabase.from('challengeSuggestion').select(`*, users(*), likes(*)`).eq('post_id', `${slug}`);
    if (data) {
      setIdeaData(data[0]);
    }
    if (error) {
      throw error;
    }
  };

  // 처음 렌더링됐을 때 함수 실행
  useEffect(() => {
    handleGetChallengeIdeaCommentData();
  }, []);

  const handleDeleteChallengeIdeaData = async () => {
    const { error } = await supabase.from('challengeSuggestion').delete().eq('post_id', `${slug}`);
    if (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      {/* 챌린지 아이디어 타이틀 */}
      <h4>{ideaData?.title}</h4>
      <div>
        <Button btnType="primary" onClick={handleDeleteChallengeIdeaData}>
          삭제
        </Button>
        <Button btnType="primary">수정</Button>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <Image src={ideaData?.users.profile_img || defaultImage} width={70} height={70} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
          </div>
          <div>
            {/* userId */}
            <p className="leading-[150%] text-[#888889] mb-[4px]">{ideaData?.users.nickname}</p>
            {/* user등급 */}
            <p className="text-lg font-bold leading-[140%]">{ideaData?.users.point}</p>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <p className="text-green leading-[150%] text-sm">추천수 {ideaData?.users.point}</p>
          <Button btnType="green" size="small">
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
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[85%] ml-5">{ideaData?.content}</p>
        </div>
        <div className="flex flex-row justify-center items-center my-6">
          <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">챌린지 물품</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[85%]">{ideaData?.product}</p>
        </div>
        <div className="flex flex-row items-center">
          <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">참여비용</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd]">25그루</p>
          <p className="text-sm text-nagative ml-4">*물품비용을 제외한 나머지 금액은 모두 환경을 위해 기부됩니다</p>
        </div>
      </div>
      <hr className="w-full my-20 border border-blue" />
    </>
  );
}

export default IdeaDetail;
