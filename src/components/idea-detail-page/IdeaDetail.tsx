'use client';
import React from 'react';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { deleteChallengeIdea } from '@/app/api/challenge-idea';
import useLike from '@/hooks/useLike.hook';
import useSessionStore from '@/store/sesson.store';

import DropDownBtn from './DropDownBtn';
import unLike from '../../../public/empty-heart.svg';
import like from '../../../public/fullHeart.svg';
import { useDialog } from '../common';

import type { Suggestion } from '@/types/db.type';

function IdeaDetail({ item }: { item: Suggestion }) {
  const queryParams = new URLSearchParams();
  const router = useRouter();
  const defaultProfileImg = '../../../defaultProfileImage.jpeg';
  const { Confirm } = useDialog();
  const mutation = useMutation({
    mutationFn: deleteChallengeIdea,
  });
  const { post_id, title, content, product, img_url, users, user_id, liked_count, liked_users } = item;
  console.log(liked_count, liked_users);

  // 로그인한 user 데이터 get
  const { session } = useSessionStore();
  const curUser = session?.user;
  const { onClickLike } = useLike(item, 'detail');

  // 챌린지 아이디어 delete
  const handleDeleteChallengeIdeaData = async () => {
    const confirmed = await Confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirmed) {
      mutation.mutate(post_id);
      router.push(`/idea`);
    }
  };

  // 수정페이지 넘어갈때 param으로 데이터 보내기
  const handleAppendParamMovePage = () => {
    if (item) {
      queryParams.append('post_id', post_id);
      queryParams.append('title', title);
      queryParams.append('content', content);
      queryParams.append('product', product);
      queryParams.append('img_url', img_url);
      queryParams.append('is_edit', 'true');

      const queryString = queryParams.toString();

      router.push(`/idea/post?${queryString}`);
    }
  };

  return (
    <>
      {/* 챌린지 아이디어 타이틀 */}
      <h4>{title}</h4>
      {curUser?.id === user_id ? <DropDownBtn editClickHandler={handleAppendParamMovePage} deleteClickHandler={handleDeleteChallengeIdeaData} position={'top-[175px] right-20'} /> : <></>}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div>
            <img src={users.profile_img || defaultProfileImg} width={70} height={70} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
          </div>
          <div>
            {/* <p className="leading-[150%] text-[#888889] mb-[4px]">{ideaData?.users.rank}</p> */}
            <p className="leading-[150%] text-[#888889] mb-[4px] ">{users.point}</p>
            <p className="text-lg font-bold leading-[140%]">{users.nickname}</p>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <p className="text-green leading-[150%] text-sm">추천수 {liked_count}</p>
          <button onClick={() => onClickLike(200)} className="py-1 px-3 flex flex-row justify-center items-center bg-[#e1f6ed] text-green rounded text-xs leading-[150%]">
            <Image src={liked_users.includes(curUser?.id!) ? like : unLike} width={16} height={16} alt="Like this idea" />
            &nbsp; 추천하기
          </button>
        </div>
      </div>
      <hr className="w-full my-10 border border-[#bdbdbd]" />
      <div className="flex justify-center items-center w-[33.37rem] h-[21.87rem] overflow-hidden mx-auto my-10 rounded-lg">
        <img src={`${img_url}`} alt="Challenge example image" className="w-full" />
      </div>
      <div>
        <div className="flex flex-row justify-center items-center">
          <p className="text-lg leading-[140%] font-medium w-[83px]">챌린지 내용</p>
          <p className="px-6 py-2 border-b border-[#bdbdbd] w-[84%] ml-5">{content}</p>
        </div>
        {product && (
          <div className="flex flex-row justify-center items-center mt-6">
            <p className="text-lg leading-[140%] font-medium mr-5 w-[83px]">챌린지 물품</p>
            <p className="px-6 py-2 border-b border-[#bdbdbd] w-[84%]">{product}</p>
          </div>
        )}
      </div>
      <hr className="w-full my-20 border border-blue" />
    </>
  );
}

export default IdeaDetail;
