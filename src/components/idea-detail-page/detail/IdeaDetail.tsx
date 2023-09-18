'use client';
import React from 'react';

import Image from 'next/image';

import { animals } from '@/components/main-page/Ranking';
import useLike from '@/hooks/useLike.hook';
import useSessionStore from '@/store/session.store';

import useIdeaDelete from './useIdeaDelete.hook';
import defaultProfileImg from '../../../../public/defaultProfileImage.jpeg';
import unLike from '../../../../public/empty-heart.svg';
import like from '../../../../public/fullHeart.svg';
import DropDownBtn from '../DropDownBtn';

import type { Suggestion } from '@/types/db.type';

function IdeaDetail({ item }: { item: Suggestion }) {
  const { post_id, title, content, product, img_url, users, user_id, liked_count, liked_users } = item;

  const { session } = useSessionStore();
  const curUser = session;
  const { onClickLike } = useLike(item, 'detail');

  const { handleDeleteChallengeIdeaData, handleAppendParamMovePage } = useIdeaDelete(post_id);

  return (
    <>
      <h4>{title}</h4>
      {curUser?.user_id === user_id ? (
        <DropDownBtn
          editClickHandler={() => handleAppendParamMovePage(item, title, content, product, img_url)}
          deleteClickHandler={handleDeleteChallengeIdeaData}
          position={'top-[175px] right-20'}
        />
      ) : (
        <></>
      )}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-[55px] h-[55px] relative overflow-hidden rounded-lg mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)]">
            <Image src={users?.profile_img || defaultProfileImg} fill alt="Profile" />
          </div>
          <div>
            <p className="leading-[150%] text-[#888889] mb-[4px]">
              {users?.rank ? animals[users?.rank >= 10 ? 3 : users?.rank >= 5 ? 2 : users?.rank >= 1 ? 1 : 0] : ''}
            </p>
            <p className="text-lg font-bold leading-[140%]">{users?.nickname}</p>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center">
          <p className="text-green leading-[150%] text-sm">추천수 {liked_count}</p>
          <button
            onClick={() => onClickLike(200)}
            className="py-1 px-3 flex flex-row justify-center items-center bg-[#e1f6ed] text-green rounded text-xs leading-[150%]"
          >
            <Image src={liked_users.includes(curUser?.user_id!) ? like : unLike} width={16} height={16} alt="Like this idea" />
            &nbsp; 추천하기
          </button>
        </div>
      </div>
      <hr className="w-full my-10 border border-[#bdbdbd]" />
      <div className="w-full h-[21.87rem] relative overflow-hidden mx-auto my-10 rounded-lg sm:w-[33.37rem]">
        <Image src={`${img_url}`} fill alt="Challenge example" className="object-cover" />
      </div>
      <div>
        <div className="flex justify-center items-center flex-col sm:flex-row">
          <p className="text-lg leading-[140%] font-medium mb-[20px] md:w-[83px] sm:w-[85px] sm:mb-0">챌린지 내용</p>
          <p className="px-6 py-2 w-full text-center sm:ml-5 sm:text-left sm:w-[84%] sm:border-b sm:border-[#bdbdbd]">{content}</p>
        </div>
        {product && (
          <div className="flex justify-center items-center mt-6 flex-row">
            <p className="text-lg leading-[140%] font-medium mr-0 md:w-[83px] sm:w-[85px] sm:mr-5">챌린지 물품</p>
            <p className="px-6 py-2 w-auto text-center sm:text-left sm:w-[84%] sm:border-b sm:border-[#bdbdbd]">{product}</p>
          </div>
        )}
      </div>
      <hr className="w-full my-20 border border-blue" />
    </>
  );
}

export default IdeaDetail;
