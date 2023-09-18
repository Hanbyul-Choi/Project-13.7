import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getIdeaCommentInfinite, postChallengeIdeaComment, updateUserPoint } from '@/app/api/idea-comments';
import { IDEA_COMMENTS } from '@/app/shared/queries.keys';
import useToast from '@/components/common/Toast/useToast';

import type { FieldValues, SubmitHandler } from 'react-hook-form';
interface Comment {
  comment: string;
}

export default function useReview(slug: string, userId: string | undefined, curUserPoint: number) {
  const { toast } = useToast();
  const {
    data: commentsData,
    isError: commentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [IDEA_COMMENTS, slug],
    queryFn: getIdeaCommentInfinite,
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  const count = commentsData?.pages[0].count;
  const challengeCommentsData = commentsData?.pages?.map(pageData => pageData.data).flat();

  const { ref } = useInView({
    threshold: 1,
    onChange: inView => {
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  const queryClient = useQueryClient();
  const postMutation = useMutation(postChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([IDEA_COMMENTS]);
    },
  });

  const handlePostComment: SubmitHandler<Comment | FieldValues> = async data => {
    const { comment } = data;
    if (comment === '') return;
    const commentData = {
      post_id: slug,
      user_id: userId,
      ...data,
    };

    const updatedPoint = curUserPoint + 2;

    if (!userId) return;
    postMutation.mutate(commentData);
    updateUserPoint(updatedPoint, userId);

    toast('나무 2그루가 지급되었습니다.');
  };

  return { commentsError, challengeCommentsData, ref, hasNextPage, handlePostComment, count };
}
