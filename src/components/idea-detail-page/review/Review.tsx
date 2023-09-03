'use client';
import React, { useState } from 'react';

import useSessionStore from '@/store/sesson.store';

import ReviewItem from './ReviewItem';
import useReview from './useReviewGetPost.hook';
import { Button } from '../../common';
import { Input } from '../../common/Input';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { IdeaComments } from '@/types/db.type';

function Review({ slug }: DetailProps) {
  const [comment, setComment] = useState<string>('');

  // 로그인한 user 데이터 get
  const { session } = useSessionStore();
  const curUser = session;

  // 해당 포스트 댓글 데이터 get, 댓글 insert
  const { commentsError, challengeCommentsData, hasNextPage, ref, handlePostComment } = useReview(slug, curUser?.user_id, comment, setComment);

  if (commentsError) {
    return <p>에러입니다.</p>;
  }

  if (!curUser) {
    return <div> 로그인 하시면 댓글을 볼 수 있어여!</div>;
  }
  return (
    <div>
      <h4 className="mb-3">댓글 {challengeCommentsData?.length}</h4>
      <div className="max-h-[350px] overflow-auto overflow-x-hidden">
        {challengeCommentsData?.map(commentData => {
          const { id, created_at, comment, users }: IdeaComments = commentData;
          return <ReviewItem key={id} id={id} created_at={created_at} comment={comment} users={users} user_id={curUser?.user_id} />;
        })}
        {hasNextPage && (
          <p className="h-[55px] flex justify-center items-center mb-[10px]" ref={ref}>
            More Comment...
          </p>
        )}
      </div>
      <form
        className="flex flex-row mt-7"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <Input placeholder="응원의 댓글을 남겨주세요." type="text" _size="md" value={comment} onChange={e => setComment(e.target.value)} />
        <Button type="submit" btnType="primary" buttonStyle="ml-[16px]" size="large" onClick={handlePostComment}>
          댓글입력
        </Button>
      </form>
    </div>
  );
}

export default Review;
