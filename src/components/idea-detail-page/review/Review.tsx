'use client';
import React from 'react';

import { useForm } from 'react-hook-form';

import InputForm from '@/components/common/InputForm';
import useSessionStore from '@/store/session.store';

import ReviewItem from './ReviewItem';
import useReview from './useReviewGetPost.hook';
import { Button } from '../../common';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { IdeaComments } from '@/types/db.type';

function Review({ slug }: DetailProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { session } = useSessionStore();
  const curUser = session;
  const curUserPoint = session?.point;

  const { commentsError, challengeCommentsData, hasNextPage, ref, handlePostComment, count } = useReview(
    slug,
    curUser?.user_id,
    curUserPoint ?? 0,
    setValue,
  );

  if (commentsError) {
    return <p>에러입니다.</p>;
  }

  if (!curUser) {
    return <div className="text-center"> 로그인 하시면 댓글을 볼 수 있어여!👀</div>;
  }
  return (
    <div>
      <h4 className="mb-3">댓글 {count}</h4>
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
      <form className="flex flex-row mt-7" onSubmit={handleSubmit(handlePostComment)}>
        <div className="flex justify-center w-full sm:flex-row sm:items-center">
          <label htmlFor="comment" className="sr-only">
            댓글내용
          </label>
          <InputForm
            name="comment"
            placeholder="응원의 댓글을 남겨주세요. (10자 ~ 300자 이내)"
            type="text"
            _size="md"
            register={register}
            rules={{
              minLength: { value: 10, message: '댓글을 10자 이상 입력해주세요.' },
              maxLength: { value: 300, message: '댓글을 300자 이하로 입력해주세요.' },
            }}
            errors={errors}
          />
          <Button type="submit" btnType="primary" buttonStyle="ml-[8px] sm:ml-[16px]" size="large">
            댓글입력
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Review;
