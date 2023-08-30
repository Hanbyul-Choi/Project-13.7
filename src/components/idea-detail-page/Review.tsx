'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { getLoginUser } from '@/app/api/auth';
import { getChallengeIdeaComment, postChallengeIdeaComment } from '@/app/api/idea-comments';

import defaultImage from '../../../public/defaultProfileImage.jpeg';
import { supabase } from '../../../supabase/supabaseConfig';
import { Button } from '../common';
import { Input } from '../common/Input';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { IdeaComments } from '@/types/db.type';

function Review({ slug }: DetailProps) {
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [commentDatas, setCommentDatas] = useState<IdeaComments[]>([]);
  const [editCommentId, setEditCommentId] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');

  const queryClient = useQueryClient();
  const mutation = useMutation(postChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('ideaComments');
    },
  });

  // 로그인한 user 데이터 get
  const { isLoading: userLoading, isError: userError, data: loginUser } = useQuery('auth', getLoginUser);
  useEffect(() => {
    if (loginUser?.session) {
      setUserId(loginUser.session.user.id);
    }
  }, [loginUser]);

  // 해당 포스트 댓글 데이터 get
  const { isLoading: commentsLoading, isError: commentsError, data: commentsData } = useQuery('ideaComments', () => getChallengeIdeaComment(slug));
  useEffect(() => {
    if (commentsData) {
      setCommentDatas(commentsData);
    }
  }, [commentsData]);

  const handleUpdateChallengeIdeaCommentData = async (id: string) => {
    const { error } = await supabase.from('ideaComments').update({ comment: editComment }).eq('id', id);
    if (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleDeleteChallengeIdeaCommentData = async (id: string) => {
    const { error } = await supabase.from('ideaComments').delete().eq('id', id);
    if (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const commentData = {
    post_id: slug,
    user_id: userId,
    comment,
  };

  const handlePostComment = () => {
    mutation.mutate(commentData);
  };

  if (commentsLoading || userLoading) {
    return <p>로딩중입니다.</p>;
  }
  if (commentsError || userError) {
    return <p>에러입니다.</p>;
  }

  return (
    <div>
      {/* ex.댓글 2 */}
      <h4 className="mb-3">댓글 {commentDatas.length}</h4>
      <div className="flex justify-center flex-col">
        {commentDatas.map(commentData => {
          const { id, created_at, comment, users } = commentData;
          return (
            <div key={id} className="flex items-center flex-row justify-start my-3">
              <Image src={users.profile_img ? users.profile_img : defaultImage} width={55} height={55} alt="Default Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
              <div>
                <div className="flex flex-row text-sm text-[#838384] leading-[150%]">
                  {/* userId */}
                  <p>{users.nickname}</p>
                  {/* Date */}
                  <p>{created_at.slice(0, 10).replaceAll('-', '.')}</p>
                </div>
                {/* 댓글 내용 */}
                {editCommentId === id ? (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                    }}
                  >
                    <Input _size="lg" type="text" value={editComment} onChange={e => setEditComment(e.target.value)} />
                    <Button btnType="primary" onClick={() => handleUpdateChallengeIdeaCommentData(id)}>
                      수정
                    </Button>
                    <Button btnType="primary" onClick={() => setEditCommentId('')}>
                      취소
                    </Button>
                  </form>
                ) : (
                  <p className="leading-[150%]">{comment}</p>
                )}
              </div>
              <button onClick={() => handleDeleteChallengeIdeaCommentData(id)}>삭제</button>
              <button
                onClick={() => {
                  setEditCommentId(id);
                  setEditComment(comment);
                }}
              >
                수정
              </button>
            </div>
          );
        })}

        <form
          className="flex flex-row mt-7"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Input placeholder="응원의 댓글을 남겨주세요." type="text" _size="md" onChange={e => setComment(e.target.value)} />
          <Button type="submit" btnType="primary" buttonStyle="ml-[16px]" size="large" onClick={handlePostComment}>
            댓글입력
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Review;
