import { useMutation, useQueryClient } from '@tanstack/react-query';

import { clickLike } from '@/app/api/idea-likes';
import { useDialog } from '@/components/common';
import useSessionStore from '@/store/sesson.store';
import useSortWayStore from '@/store/sortway.store';

import type { IdeaQueryType, Suggestion } from '@/types/db.type';

export default function useLike(item: Suggestion) {
  const { post_id, liked_users } = item;
  const queryClient = useQueryClient();
  const { Alert } = useDialog();
  const { session } = useSessionStore();
  const { sortWay } = useSortWayStore();
  const curUserId = session?.user.id;

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
        await queryClient.cancelQueries({ queryKey: ['challengeSuggestion', sortWay] });
        await queryClient.cancelQueries({ queryKey: ['challengeSuggestion'] });
        const prevIdeaInfinite: IdeaQueryType | undefined = queryClient.getQueryData(['challengeSuggestion', sortWay]);
        const prevIdea: Suggestion[] | undefined = queryClient.getQueryData(['challengeSuggestion']);
        if (prevIdeaInfinite === undefined) return;
        if (prevIdea === undefined) return;

        const newLikedUsers = checkLiked() ? liked_users.filter(user => user !== curUserId) : [...liked_users, curUserId];
        const newPages = prevIdeaInfinite?.pages?.map(arr => {
          return {
            ...arr,
            result: arr.result.map(item => {
              if (item.post_id === post_id) {
                return { ...item, liked_users: newLikedUsers };
              }
              return item;
            }),
          };
        });

        const updatedIdeaInfinite = { ...prevIdea, pages: newPages };

        const updatedIdea = prevIdea.map(idea => {
          if (post_id === idea.post_id) {
            if (checkLiked()) {
              console.log('dislike');
              return { ...idea, liked_users: liked_users.filter(user => user !== curUserId) };
            } else {
              console.log('like');
              return { ...idea, liked_users: [...liked_users, curUserId] };
            }
          }
          return idea;
        });

        queryClient.setQueryData(['challengeSuggestion', sortWay], updatedIdeaInfinite);
        queryClient.setQueryData(['challengeSuggestion'], updatedIdea);
        return { prevIdea, prevIdeaInfinite };
      },
      onError: ({ context }) => {
        if (context === undefined) return;
        queryClient.setQueryData(['challengeSuggestion', sortWay], context.prevIdeaInfinite);
        queryClient.setQueryData(['challengeSuggestion'], context.ideaData);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: ['challengeSuggestion', sortWay] });
        await queryClient.invalidateQueries({ queryKey: ['challengeSuggestion'] });
      },
    },
  );

  const onClickLike = async () => {
    if (!curUserId) {
      return await Alert('로그인 후 이용 가능합니다.');
    }
    clickLikeMutation.mutate();
  };
  return { onClickLike };
}
