'use client';
import React, { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteChallengeIdeaComment, updateChallengeIdeaComment } from '@/app/api/idea-comments';

import DropDownBtn from './DropDownBtn';
import { Input, useDialog } from '../common';

import type { IdeaComments } from '@/types/db.type';

function ReviewItem({ id, created_at, comment, users, user_id }: IdeaComments) {
  const [editCommentId, setEditCommentId] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');
  const defaultProfileImg = '../../../defaultProfileImage.jpeg';
  const queryClient = useQueryClient();

  const editMutation = useMutation(updateChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
    },
  });

  const deleteMutation = useMutation(deleteChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
    },
  });

  const { Confirm } = useDialog();
  // 댓글 update
  const handleUpdateChallengeIdeaCommentData = (id: string) => {
    const newUpdateComment = { id, editComment };
    editMutation.mutate(newUpdateComment);
    setEditCommentId('');
  };

  // 댓글 delete
  const handleDeleteChallengeIdeaCommentData = async (id: string) => {
    const confirmed = await Confirm('해당 댓글을 삭제하시겠습니까?');
    if (confirmed) deleteMutation.mutate(id);
  };

  const handleUpdateCommentDropDown = (id: string, comment: string) => {
    setEditCommentId(id);
    setEditComment(comment);
  };
  return (
    <div className="flex items-center flex-row justify-start my-3 relative">
      <img src={users.profile_img ? users.profile_img : defaultProfileImg} width={55} height={55} alt="Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
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
          <p className="leading-[150%]">{comment}</p>
        )}
      </div>
      {user_id === users.user_id ? <DropDownBtn editClickHandler={() => handleUpdateCommentDropDown(id, comment)} deleteClickHandler={() => handleDeleteChallengeIdeaCommentData(id)} position={'top-0 right-0'} /> : <></>}
    </div>
  );
}

export default ReviewItem;
