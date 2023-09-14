import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getIdeaCommentInfinite, postChallengeIdeaComment, updateUserPoint } from '@/app/api/idea-comments';

export default function useReview(
  slug: string,
  userId: string | undefined,
  curUserPoint: number,
  comment: string,
  setComment: React.Dispatch<React.SetStateAction<string>>,
) {
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

  const queryClient = useQueryClient();
  const postMutation = useMutation(postChallengeIdeaComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ideaComments']);
    },
  });

  const commentData = {
    post_id: slug,
    user_id: userId,
    comment,
  };

  const handlePostComment = () => {
    const updatedPoint = curUserPoint + 2;

    if (!userId) return;
    postMutation.mutate(commentData);
    setComment('');
    updateUserPoint(updatedPoint, userId);
  };

  return { commentsError, challengeCommentsData, ref, hasNextPage, handlePostComment };
}
