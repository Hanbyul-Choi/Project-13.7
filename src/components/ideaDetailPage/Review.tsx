'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useMutation } from 'react-query';

import { postChallengeIdeaComment } from '@/app/api/ideaComments';

import defaultImage from '../../../public/defaultProfileImage.jpeg';
import { supabase } from '../../../supabase/supabaseConfig';
import { Button } from '../common';
import { Input } from '../common/Input';

type TChallengeId = {
  slug: string;
};
export type TChallengeIdeaComment = {
  [key: string]: string;
};

function Review({ slug }: TChallengeId) {
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [commentDatas, setCommentDatas] = useState<TChallengeIdeaComment[]>([]);
  const [isEdit, setIsEdit] = useState<Boolean>(false);

  const mutation = useMutation({
    mutationFn: postChallengeIdeaComment,
  });

  const handleGetLogintUserId = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUserId(data.session?.user.id);
    }
  };

  const handleGetChallengeIdeaCommentData = async () => {
    const { data: comments, error } = await supabase.from('ideaComments').select().eq('post_id', `${slug}`);
    if (comments) {
      const commentUserIdArr = comments.map(comment => comment.user_id);
      const set = new Set(commentUserIdArr);
      const filterCommentUserIdArr = [...set];
      const { data: commentUser, error } = await supabase.from('users').select().in('user_id', filterCommentUserIdArr);
      const newComments = comments.map(comment => {
        const findUser = commentUser?.find(user => user.user_id === comment.user_id);
        return { ...findUser, ...comment };
      });
      setCommentDatas(newComments);
    }
    if (error) {
      throw error;
    }
  };

  // 처음 렌더링됐을 때 함수 실행
  useEffect(() => {
    handleGetLogintUserId();
    handleGetChallengeIdeaCommentData();
  }, []);

  const commentData = {
    post_id: slug,
    user_id: userId,
    comment,
  };

  const handleDeleteChallengeIdeaCommentData = async (id: string) => {
    const { error } = await supabase.from('ideaComments').delete().eq('id', id);
    if (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handlePostComment = () => {
    mutation.mutate(commentData);
  };

  return (
    <div>
      {/* ex.댓글 2 */}
      <h4 className="mb-3">댓글 {commentDatas.length}</h4>
      <div className="flex justify-center flex-col">
        {commentDatas.map(comment => {
          return (
            <div key={comment.id} className="flex items-center flex-row justify-start my-3">
              <Image src={comment.profile_img ? comment.profile_img : defaultImage} width={55} height={55} alt="Default Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
              <div>
                <div className="flex flex-row text-sm text-[#838384] leading-[150%]">
                  {/* userId */}
                  <p>{comment.nickname}</p>
                  {/* Date */}
                  <p>{comment.created_at.slice(0, 10).replaceAll('-', '.')}</p>
                </div>
                {/* 댓글 내용 */}
                {isEdit ? (
                  <>
                    <Input _size="lg" />
                    <Button btnType="primary">입력</Button>
                  </>
                ) : (
                  <p className="leading-[150%]">{comment.comment}</p>
                )}
              </div>
              <button onClick={() => handleDeleteChallengeIdeaCommentData(comment.id)}>삭제</button>
              <button onClick={() => setIsEdit(true)}>수정</button>
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
          <Button type="submit" btnType="primary" buttonStyle="ml-[16px]" onClick={handlePostComment}>
            댓글입력
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Review;
