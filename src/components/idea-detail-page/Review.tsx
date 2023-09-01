'use client';
import React, { useEffect, useState } from 'react';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getLoginUser } from '@/app/api/auth';
import { deleteChallengeIdeaComment, getIdeaCommentInfinite, postChallengeIdeaComment, updateChallengeIdeaComment } from '@/app/api/idea-comments';

import DropDownBtn from './DropDownBtn';
import { Button, useDialog } from '../common';
import { Input } from '../common/Input';

import type { DetailProps } from '@/app/idea/[slug]/page';

function Review({ slug }: DetailProps) {
  const defaultProfileImg = '../../../defaultProfileImage.jpeg';
  const { Confirm } = useDialog();
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [editCommentId, setEditCommentId] = useState<string>('');
  const [editComment, setEditComment] = useState<string>('');

  const queryClient = useQueryClient();
  const postMutation = useMutation(postChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
    },
  });
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
          const { id, created_at, comment, users } = commentData;
          return (
            <div key={id} className="flex items-center flex-row justify-start my-3 relative">
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
              {userId === users.user_id ? <DropDownBtn editClickHandler={() => handleUpdateCommentDropDown(id, comment)} deleteClickHandler={() => handleDeleteChallengeIdeaCommentData(id)} position={'top-0 right-0'} /> : <></>}
            </div>
          );
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
