import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { getIdeaCommentInfinite, postChallengeIdeaComment } from '@/app/api/idea-comments';
import { IDEA_COMMENTS } from '@/app/shared/queries.keys';
import { useDialog } from '@/components/common';

export default function useReview(
  slug: string,
  userId: string | undefined,
  comment: string,
  setComment: React.Dispatch<React.SetStateAction<string>>,
) {
  const { Alert } = useDialog();
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

  const commentData = {
    post_id: slug,
    user_id: userId,
    comment,
  };
  const handlePostComment = () => {
    if (comment === '') return;
    if (comment.length > 300) {
      Alert('글자 수 300자를 넘었습니다.');
      return;
    }
    if (!userId) return;
    postMutation.mutate(commentData);
    setComment('');
  };

  return { commentsError, challengeCommentsData, ref, hasNextPage, handlePostComment };
}
