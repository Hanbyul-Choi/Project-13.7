'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useMutation, useQueryClient } from 'react-query';

import { clickLike } from '@/app/api/idea-likes';
import useSessionStore from '@/store/sesson.store.';

import disLiked from '../../../public/empty-heart.svg';
import liked from '../../../public/heart.svg';
import { useDialog } from '../common/Dialog';

import type { Likes, Suggestion } from '@/types/db.type';

const animals = {
  animal: '북극곰',
};

interface Props {
  item: Suggestion;
}

export function IdeaContent({ item }: Props) {
  const { post_id, users, content, title, created_at, img_url } = item;
  const queryClient = useQueryClient();
  const [isliked, setIsLiked] = useState(false);
  const { Alert } = useDialog();
  const { session } = useSessionStore();
  const curUserId = session?.user.id;
  const likedUsers = item.likes?.users;
  const checkLiked = () => {
    if (!curUserId) return false;
    return likedUsers?.includes(curUserId);
  };

  const clickLikeMutation = useMutation(
    async () => {
      if (!curUserId) return;
      if (likedUsers) {
        let newUsers = [];
        if (checkLiked()) {
          newUsers = likedUsers.filter(user => user !== curUserId);
        } else {
          newUsers = likedUsers ? [...likedUsers, curUserId] : [curUserId];
        }
        clickLike(newUsers, post_id, 'update');
      } else {
        clickLike([curUserId], post_id, 'insert');
      }
    },
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: 'challengeSuggestion' });
        const prevLikes: Likes[] | undefined = queryClient.getQueryData('challengeSuggestion');
        if (prevLikes === undefined) return;
        const updatedLikes = likedUsers
          ? prevLikes.map(like => {
              if (post_id === like.post_id) {
                // 좋아요 취소
                if (checkLiked()) {
                  return {
                    ...like,
                    users: likedUsers.filter(userId => userId !== curUserId),
                  };
                } else {
                  // 좋아요 추가
                  return {
                    ...like,
                    users: [...likedUsers, curUserId!],
                  };
                }
              }
              return like;
            })
          : [
              ...prevLikes,
              {
                post_id,
                users: [curUserId!],
              },
            ];
        queryClient.setQueryData('challengeSuggestion', updatedLikes);
        return { prevLikes };
      },
      onError: ({ context }) => {
        if (context === undefined) return;
        queryClient.setQueryData(['challengeSuggestion'], context.prevLikes);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey: 'challengeSuggestion' });
      },
    },
  );

  const onClickLike = async () => {
    if (!curUserId) {
      return await Alert('로그인 후 이용 가능합니다.');
    }
    clickLikeMutation.mutate();
    setIsLiked(prev => !prev);
  };

  useEffect(() => {
    if (likedUsers?.includes(curUserId!)) {
      setIsLiked(true);
    }
  }, [curUserId, likedUsers]);

  return (
    <div className="flex flex-col w-72 ">
      <div className="bg-sub2 rounded-t-lg text-center relative h-[250px] overflow-hidden">
        <img src={img_url} alt="인증예시 사진" style={{ objectFit: 'cover', width: '288px', height: '250px' }} />
        <button onClick={onClickLike} className="absolute text-green bottom-4 right-4 flex flex-col items-center rounded-lg bg-white px-3 py-2 hover: scale-110">
          <Image src={isliked ? liked : disLiked} alt="Like this idea" />
          <p className="text-sm ">{likedUsers?.length ?? 0}</p>
        </button>
      </div>
      <Link href={`/idea/${post_id}`} className="flex flex-col px-3 py-6 rounded-b-lg shadow-lg ">
        <p className="text-sm opacity-50 ">
          {users.nickname} | {new Date(created_at).toLocaleDateString()}
        </p>
        <p className="mt-3 w-full text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">{title}</p>
        <p className="mt-2 w-full h-12 opacity-50">{content}</p>
        <div className="max-w-fit px-4 py-1 rounded bg-lightblue mt-4">
          <p className="text-blue text-sm ">{animals.animal}을 위한 챌린지</p>
        </div>
      </Link>
    </div>
  );
}
