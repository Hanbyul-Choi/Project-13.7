'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

import { deleteChallengeIdea } from '@/app/api/challenge-idea';

import DropDownBtn from './DropDownBtn';
import defaultImage from '../../../public/defaultProfileImage.jpeg';
import heartIcon from '../../../public/heart.svg';
import { supabase } from '../../../supabase/supabaseConfig';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { Suggestion } from '@/types/db.type';

function IdeaDetail({ slug }: DetailProps) {
  const [ideaData, setIdeaData] = useState<Suggestion>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryParams = new URLSearchParams();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: deleteChallengeIdea,
  });

  // 챌린지 아이디어 get
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

  // 챌린지 아이디어 delete
  const handleDeleteChallengeIdeaData = async () => {
    mutation.mutate(slug);
    router.push(`/idea`);
  };

  // 수정페이지 넘어갈때 param으로 데이터 보내기
  const handleAppendParamMovePage = () => {
    if (ideaData) {
      queryParams.append('post_id', slug);
      queryParams.append('title', ideaData.title);
      queryParams.append('content', ideaData.content);
      queryParams.append('product', ideaData.product);
      queryParams.append('img_url', ideaData.img_url);
      queryParams.append('is_edit', 'true');

      const queryString = queryParams.toString();

      router.push(`/idea/post?${queryString}`);
    }
  };
  return (
    <>
      {/* 챌린지 아이디어 타이틀 */}
      <h4>{ideaData?.title}</h4>
      <DropDownBtn editClickHandler={handleAppendParamMovePage} deleteClickHandler={handleDeleteChallengeIdeaData} isOpen={isOpen} setIsOpen={setIsOpen} position={'top-[175px] right-20'} />
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <img src={`${defaultImage || ideaData?.users.profile_img}`} width={70} height={70} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
            {/* <Image src={defaultImage} width={70} height={70} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " /> */}
          </div>
          <div>
            <p className="leading-[150%] text-[#888889] mb-[4px]">{ideaData?.users.point}</p>
            <p className="text-lg font-bold leading-[140%]">{ideaData?.users.nickname}</p>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          {/* <p className="text-green leading-[150%] text-sm">추천수 {ideaData?.likes.like_count}</p> */}
          <p className="text-green leading-[150%] text-sm">추천수 {ideaData?.users.point}</p>
          <button className="py-1 px-3 flex flex-row justify-center items-center bg-[#e1f6ed] text-green rounded text-xs leading-[150%]">
            <Image src={heartIcon} width={16} height={16} alt="Like this idea" />
            추천하기
          </button>
        </div>
      </div>
      <hr className="w-full my-10 border border-[#bdbdbd]" />
      <div className="flex justify-center items-center w-[33.37rem] h-[21.87rem] overflow-hidden mx-auto my-10 rounded-lg">
        <img src={`${ideaData?.img_url}`} alt="Challenge example image" className="w-full" />
      </div>
      <div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg leading-[140%] font-medium w-[83px]">챌린지 내용</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[84%] ml-5">{ideaData?.content}</p>
        </div>
        <div className="flex flex-row justify-center items-center mt-6">
          <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">챌린지 물품</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[84%]">{ideaData?.product}</p>
        </div>
        {/* <div className="flex flex-row items-center">
          <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">참여비용</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd]">25그루</p>
          <p className="text-sm text-nagative ml-4">*물품비용을 제외한 나머지 금액은 모두 환경을 위해 기부됩니다</p>
        </div> */}
      </div>
      <hr className="w-full my-20 border border-blue" />
    </>
  );
}

export default IdeaDetail;
