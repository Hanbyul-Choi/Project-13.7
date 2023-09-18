'use client';
import React, { useState } from 'react';

import Image from 'next/image';

import useReviewUpdateDelete from './useReviewUpdateDelete.hook';
import defaultProfileImg from '../../../../public/defaultProfileImage.jpeg';
import { Input } from '../../common';

import type { IdeaComments } from '@/types/db.type';

function ReviewItem({ id, created_at, comment, users, user_id }: IdeaComments) {
  const [editCommentId, setEditCommentId] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');

  const { handleUpdateChallengeIdeaCommentData, handleDeleteChallengeIdeaCommentData, handleCommentDropDown } = useReviewUpdateDelete(
    editComment,
    setEditCommentId,
    setEditComment,
  );

  return (
    <div className="flex flex-row justify-start my-3 relative">
      <div className="w-[25px] h-[25px] mr-[8px] relative overflow-hidden shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg sm:w-[55px] sm:h-[55px] sm:mr-[16px]">
        <Image src={users?.profile_img ? users?.profile_img : defaultProfileImg} fill alt="Profile" className="object-cover" />
      </div>
      <div className="w-full sm:w-auto">
        <div className="flex flex-row text-sm text-[#838384] leading-[150%] items-center">
          <p className="after:content-[' '] after:w-[1px] after:bg-[#838384] after:h-[12px] after:inline-block after:m-[8px] flex items-center">
            {users?.nickname}
          </p>
          <p>{created_at.slice(0, 10).replaceAll('-', '.')}</p>
        </div>
        {editCommentId === id ? (
          <>
            <div className="absolute top-0 right-[10px] flex">
              <button
                className="text-sm text-[#838384] after:content-[' '] after:w-[1px] after:bg-[#838384] after:h-[12px] after:inline-block after:m-[8px] flex items-center"
                onClick={() => handleUpdateChallengeIdeaCommentData(id)}
              >
                수정완료
              </button>
              <button className="text-sm text-[#838384]" onClick={() => setEditCommentId('')}>
                취소
              </button>
            </div>
            <Input _size="lg" type="text" value={editComment} onChange={e => setEditComment(e.target.value)} />
          </>
        ) : (
          <p className="leading-[150%] break-words w-full sm:w-[31.25rem]">{comment}</p>
        )}
        {user_id === users?.user_id && editCommentId === '' ? (
          <div className="absolute top-0 right-[10px] flex">
            <button
              onClick={() => handleCommentDropDown(id, comment)}
              className="text-sm text-[#838384] after:content-[' '] after:w-[1px] after:bg-[#838384] after:h-[12px] after:inline-block after:m-[8px] flex items-center"
            >
              수정
            </button>
            <button onClick={() => handleDeleteChallengeIdeaCommentData(id)} className="text-sm text-nagative">
              삭제
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default ReviewItem;
