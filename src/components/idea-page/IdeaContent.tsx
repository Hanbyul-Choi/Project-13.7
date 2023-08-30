'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import useLike from '@/hooks/useLike.hook';
import useSessionStore from '@/store/sesson.store';

import disLiked from '../../../public/empty-heart.svg';
import liked from '../../../public/heart.svg';

import type { Suggestion } from '@/types/db.type';

const animals = {
  animal: '북극곰',
};

interface Props {
  item: Suggestion;
}

export function IdeaContent({ item }: Props) {
  const { post_id, users, created_at, img_url, liked_count, liked_users, title, content } = item;
  const { session } = useSessionStore();
  const { onClickLike } = useLike(item);

  return (
    <div className="flex flex-col w-72">
      <div className="bg-sub2 rounded-t-lg text-center relative h-[250px] overflow-hidden">
        <img src={img_url} alt="인증예시 사진" style={{ objectFit: 'cover', width: '288px', height: '250px' }} />
        <button onClick={onClickLike} className="absolute text-green bottom-4 right-4 flex flex-col items-center rounded-lg bg-white px-3 py-2 hover: scale-110">
          <Image src={liked_users?.includes(session?.user.id!) ? liked : disLiked} alt="Like this idea" />
          <p className="text-sm">{liked_count}</p>
        </button>
      </div>
      <Link href={`/idea/${post_id}`} className="flex flex-col px-3 py-6 rounded-b-lg shadow-lg ">
        <p className="text-sm opacity-50 ">
          {users?.nickname} | {new Date(created_at).toLocaleDateString()}
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
