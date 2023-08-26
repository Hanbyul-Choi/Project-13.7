'use client';
import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { PropagateLoader } from 'react-spinners';

import { getSuggestions } from '@/app/api/ChallengeSuggestion';

import IdeaHeader from './IdeaHeader';
import Dog from '../../../public/dog.jpg';
import heartIcon from '../../../public/heart.svg';
import Button from '../common/Button';

export type SortWay = '추천순' | '최신순';

export default function IdeaList() {
  const [sortWay, setSortway] = useState<SortWay>('추천순');
  let { isError, data } = useQuery('challengeSuggestion', getSuggestions);

  if (isError) {
    return <p>에러가 발생했습니다. 새로고침 해주세요.</p>;
  }

  return (
    <>
      {data ? (
        <>
          <IdeaHeader sortWay={sortWay} setSortway={setSortway} />
          <div className="flex flex-col items-center gap-[7.5rem] mb-20">
            <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-4 gap-y-10">
              {data.map(({ post_id, users, created_at, title, content, animal, likes }) => (
                <div className="flex flex-col w-72 " key={post_id}>
                  <div className="bg-sub2 rounded-t-lg text-center relative h-[250px] overflow-hidden">
                    <Image src={Dog} alt="개야" style={{ objectFit: 'fill', height: '250px' }} />
                    <button className="absolute text-green bottom-4 right-4 flex flex-col items-center rounded-lg bg-white px-3 py-2">
                      <Image priority src={heartIcon} alt="Like this idea" />
                      <p className="text-sm ">{likes}</p>
                    </button>
                  </div>
                  <Link href={`/idea/${post_id}`} className="flex flex-col px-3 py-6 rounded-b-lg shadow-lg ">
                    <p className="text-sm opacity-50 ">
                      {users.nickname} | {new Date(created_at).toLocaleDateString()}
                    </p>
                    <p className="mt-3 w-full text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">{title}</p>
                    <p className="mt-2 w-full h-12 opacity-50">{content}</p>
                    <div className="max-w-fit px-4 py-1 rounded bg-lightblue mt-4">
                      <p className="text-blue text-sm ">{animal || '북극곰'}을 위한 챌린지</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <Button btnType="borderBlack" size="large" rounded>
              더보기
              <AiOutlineArrowRight size={20} />
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-10">
          <PropagateLoader color="#36d7b7" size={20} />
        </div>
      )}
    </>
  );
}
