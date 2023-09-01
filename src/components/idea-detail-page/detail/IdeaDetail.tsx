'use client';
import React from 'react';

import Image from 'next/image';

import useLike from '@/hooks/useLike.hook';
import useSessionStore from '@/store/sesson.store';

import useIdeaDelete from './useIdeaDelete.hook';
import unLike from '../../../../public/empty-heart.svg';
import like from '../../../../public/fullHeart.svg';
import DropDownBtn from '../DropDownBtn';

import type { Suggestion } from '@/types/db.type';

function IdeaDetail({ item }: { item: Suggestion }) {
  const defaultProfileImg = '../../../defaultProfileImage.jpeg';

  const { post_id, title, content, product, img_url, users, user_id, liked_count, liked_users } = item;

  // 로그인한 user 데이터 get
  const { session } = useSessionStore();
  const curUser = session?.user;
  const { onClickLike } = useLike(item, 'detail');

  // 챌린지 아이디어 delete, 수정페이지 넘어갈때 param으로 데이터 보내기
  const { handleDeleteChallengeIdeaData, handleAppendParamMovePage } = useIdeaDelete(post_id);

  return (
    <>
      {/* 챌린지 아이디어 타이틀 */}
      <h4>{title}</h4>
      {curUser?.id === user_id ? <DropDownBtn editClickHandler={() => handleAppendParamMovePage(item, title, content, product, img_url)} deleteClickHandler={handleDeleteChallengeIdeaData} position={'top-[175px] right-20'} /> : <></>}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[55px] h-[55px] overflow-hidden rounded-lg mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)]">
            <img src={users.profile_img || defaultProfileImg} width={70} height={70} alt="Profile Image" />
          </div>
          <div>
            {/* <p className="leading-[150%] text-[#888889] mb-[4px]">{users.rank}</p> */}
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
        {/* <Image src={`${img_url}`} width={550} height={550} alt="Challenge example image" className="w-full" /> */}
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
