import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clickLike } from '@/app/api/idea-likes';
import { useDialog } from '@/components/common';
import useSessionStore from '@/store/sesson.store';
import useSortWayStore from '@/store/sortway.store';

import type { Suggestion } from '@/types/db.type';

export default function useLike(item: Suggestion, type: 'list' | 'detail') {
  const { post_id, liked_users } = item;
  const queryClient = useQueryClient();
  const { Alert } = useDialog();
  const { session } = useSessionStore();
  const { sortWay } = useSortWayStore();
  const curUserId = session?.user_id;
  let timerId: any = null;

  const checkLiked = () => {
    if (!curUserId) return false;
    return liked_users?.includes(curUserId);
  };

  const clickLikeMutation = useMutation(
    async () => {
      if (!curUserId) return;
      let newUsers = [];
      if (checkLiked()) {
        newUsers = liked_users.filter(user => user !== curUserId);
      } else {
        newUsers = liked_users ? [...liked_users, curUserId] : [curUserId];
      }
      clickLike(newUsers, post_id);
    },
    {
      onMutate: async () => {
        let prevIdea;
        const newLikedUsers = checkLiked() ? liked_users.filter(user => user !== curUserId) : [...liked_users, curUserId];
        if (type === 'detail') {
          await queryClient.cancelQueries({ queryKey: ['challengeSuggestion'] });
          prevIdea = await queryClient.getQueryData(['challengeSuggestion']);
          const updatedIdea = prevIdea?.map((idea: Suggestion) => {
            if (post_id === idea.post_id) {
              return { ...idea, liked_users: newLikedUsers, liked_count: newLikedUsers.length };
            }
            return idea;
          });
          queryClient.setQueryData(['challengeSuggestion'], updatedIdea);
        } else if (type === 'list') {
          await queryClient.cancelQueries({ queryKey: ['challengeSuggestion', sortWay] });
          prevIdea = await queryClient.getQueryData(['challengeSuggestion', sortWay]);
          const newPages = prevIdea?.pages?.map((arr: any) => {
            return {
              ...arr,
              result: arr.result.map((item: Suggestion) => {
                if (item.post_id === post_id) {
                  return { ...item, liked_users: newLikedUsers, liked_count: newLikedUsers.length };
                }
                return item;
              }),
            };
          });
          const updatedIdeaInfinite = { ...prevIdea, pages: newPages };
          queryClient.setQueryData(['challengeSuggestion', sortWay], updatedIdeaInfinite);
        }

        return { prevIdea };
      },
      onError: ({ context }) => {
        if (context === undefined) return;
        queryClient.setQueryData(['challengeSuggestion', sortWay], context.prevIdea);
        queryClient.setQueryData(['challengeSuggestion'], context.prevIdea);
        console.log('업데이트 실패');
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ['challengeSuggestion', sortWay] });
        await queryClient.invalidateQueries({ queryKey: ['challengeSuggestion'] });
      },
    },
  );

  const onClickLike = (delay: number) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      if (!curUserId) {
        return Alert('로그인 후 이용 가능합니다.');
      }
      clickLikeMutation.mutate();
    }, delay);
  };
  return { onClickLike };
}
