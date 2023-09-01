'use client';
import React, { useEffect, useState } from 'react';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getLoginUser } from '@/app/api/auth';
import { getIdeaCommentInfinite, postChallengeIdeaComment } from '@/app/api/idea-comments';

import ReviewItem from './ReviewItem';
import { Button } from '../common';
import { Input } from '../common/Input';

import type { DetailProps } from '@/app/idea/[slug]/page';
import type { IdeaComments } from '@/types/db.type';

function Review({ slug }: DetailProps) {
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const queryClient = useQueryClient();
  const postMutation = useMutation(postChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
    },
  });

  // 로그인한 user 데이터 get
  const { isLoading: userLoading, isError: userError, data: loginUser } = useQuery(['auth'], getLoginUser);
  useEffect(() => {
    if (loginUser?.session) {
      setUserId(loginUser.session.user.id);
    }
  }, [loginUser]);

  // 해당 포스트 댓글 데이터 get
  const {
    data: commentsData,
    isError: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['ideaComments', slug],
    queryFn: getIdeaCommentInfinite,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  const challengeCommentsData = commentsData?.pages?.map(pageData => pageData.data).flat();

  const { ref } = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  // 댓글 insert
  const commentData = {
    post_id: slug,
    user_id: userId,
    comment,
  };
  const handlePostComment = () => {
    postMutation.mutate(commentData);
    setComment('');
  };

  if (userLoading) {
    return <p>로딩중입니다.</p>;
  }
  if (commentsError || userError) {
    return <p>에러입니다.</p>;
  }
  return (
    <div>
      <h4 className="mb-3">댓글 {challengeCommentsData?.length}</h4>
      <div className="max-h-[345px] overflow-auto">
        {challengeCommentsData?.map(commentData => {
          const { id, created_at, comment, users }: IdeaComments = commentData;
          return <ReviewItem key={id} id={id} created_at={created_at} comment={comment} users={users} user_id={userId} />;
        })}
        {hasNextPage && (
          <p className="h-[55px] flex justify-center items-center" ref={ref}>
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
