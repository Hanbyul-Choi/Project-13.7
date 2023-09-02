import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getIdeaCommentInfinite, postChallengeIdeaComment } from '@/app/api/idea-comments';

export default function useReview(slug: string, userId: string | undefined, comment: string, setComment: React.Dispatch<React.SetStateAction<string>>) {
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
    if (!userId) return;
    postMutation.mutate(commentData);
    setComment('');
  };

  return { commentsError, challengeCommentsData, ref, hasNextPage, handlePostComment };
}
