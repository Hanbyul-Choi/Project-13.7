'use client';
import React, { useState } from 'react';

import useReviewUpdateDelete from './useReviewUpdateDelete.hook';
import { Input } from '../../common';
import DropDownBtn from '../DropDownBtn';

import type { IdeaComments } from '@/types/db.type';

function ReviewItem({ id, created_at, comment, users, user_id }: IdeaComments) {
  const [editCommentId, setEditCommentId] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');
  const defaultProfileImg = '../../../defaultProfileImage.jpeg';

  // 댓글 Update, Delete
  const { handleUpdateChallengeIdeaCommentData, handleDeleteChallengeIdeaCommentData, handleCommentDropDown } = useReviewUpdateDelete(editComment, setEditCommentId, setEditComment);

  return (
    <div className="flex flex-row justify-start my-3 relative">
      <div className="w-[55px] h-[55px] overflow-hidden mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg">
        <img src={users.profile_img ? users.profile_img : defaultProfileImg} width={55} height={55} alt="Profile Image" />
      </div>
      <div>
        <div className="flex flex-row text-sm text-[#838384] leading-[150%] items-center">
          <p className="after:content-[' '] after:w-[1px] after:bg-[#838384] after:h-[12px] after:inline-block after:m-[8px] flex items-center">{users.nickname}</p>
          <p>{created_at.slice(0, 10).replaceAll('-', '.')}</p>
        </div>
        {editCommentId === id ? (
          <form
            className="relative"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <div className="absolute top-[-28px] right-0 flex">
              <button className="text-sm text-[#838384] after:content-[' '] after:w-[1px] after:bg-[#838384] after:h-[12px] after:inline-block after:m-[8px] flex items-center" onClick={() => handleUpdateChallengeIdeaCommentData(id)}>
                수정완료
              </button>
              <button className="text-sm text-[#838384]" onClick={() => setEditCommentId('')}>
                취소
              </button>
            </div>
            <Input _size="lg" type="text" value={editComment} onChange={e => setEditComment(e.target.value)} />
          </form>
        ) : (
          <p className="leading-[150%] break-words w-[31.25rem]">{comment}</p>
        )}
      </div>
      {user_id === users.user_id ? <DropDownBtn editClickHandler={() => handleCommentDropDown(id, comment)} deleteClickHandler={() => handleDeleteChallengeIdeaCommentData(id)} position={'top-0 right-[10px]'} /> : <></>}
    </div>
  );
}

export default ReviewItem;
