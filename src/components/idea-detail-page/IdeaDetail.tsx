'use client';
import React, { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { getLoginUser } from '@/app/api/auth';
import { deleteChallengeIdea, getSuggestions } from '@/app/api/challenge-idea';

import DropDownBtn from './DropDownBtn';
import heartIcon from '../../../public/heart.svg';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { Suggestion } from '@/types/db.type';

function IdeaDetail({ slug }: DetailProps) {
  const [ideaData, setIdeaData] = useState<Suggestion>();
  const [userId, setUserId] = useState<string>('');
  const queryParams = new URLSearchParams();
  const router = useRouter();
  const defaultProfileImg = '../../../defaultProfileImage.jpeg';
  const mutation = useMutation({
    mutationFn: deleteChallengeIdea,
  });
  // 로그인한 user 데이터 get
  const { isLoading: userLoading, isError: userError, data: loginUser } = useQuery(['auth'], getLoginUser);
  useEffect(() => {
    if (loginUser?.session) {
      setUserId(loginUser.session.user.id);
    }
  }, [loginUser]);

  // 챌린지 아이디어 get
  const { isLoading: ideaLoading, isError: ideaError, data: challengeIdeaData } = useQuery(['challengeSuggestion'], getSuggestions);
  useEffect(() => {
    if (challengeIdeaData && Array.isArray(challengeIdeaData)) {
      const filteredData = challengeIdeaData.find(idea => idea.post_id === slug);
      if (filteredData) {
        setIdeaData(filteredData);
      }
    }
  }, [challengeIdeaData, slug]);

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

  if (userLoading || ideaLoading) {
    return <p>로딩중입니다.</p>;
  }
  if (userError || ideaError) {
    return <p>에러입니다.</p>;
  }

  console.log(ideaData);
  return (
    <>
      {/* 챌린지 아이디어 타이틀 */}
      <h4>{ideaData?.title}</h4>
      {/* <DropDownBtn editClickHandler={handleAppendParamMovePage} deleteClickHandler={handleDeleteChallengeIdeaData} position={'top-[175px] right-20'} /> */}
      {userId === ideaData?.user_id ? <DropDownBtn editClickHandler={handleAppendParamMovePage} deleteClickHandler={handleDeleteChallengeIdeaData} position={'top-[175px] right-20'} /> : <></>}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <img src={ideaData?.users.profile_img || defaultProfileImg} width={70} height={70} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
            {/* <Image src={defaultImage} width={70} height={70} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " /> */}
          </div>
          <div>
            {/* <p className="leading-[150%] text-[#888889] mb-[4px]">{ideaData?.users.rank}</p> */}
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
        {ideaData?.product && (
          <div className="flex flex-row justify-center items-center mt-6">
            <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">챌린지 물품</p>
            <p className="px-6 py-2 border-b border-[#bdbdbd] w-[84%]">{ideaData?.product}</p>
          </div>
        )}
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
