import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

import heartIcon from '../../../public/heart.svg';
import Button from '../common/Button';

const data = [
  {
    id: 1,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! ',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 2,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! ',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 3,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! ',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 4,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 트',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 5,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! ',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 6,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요!',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 7,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요!',
    animal: '북극곰',
    likes: 1234,
  },
  {
    id: 8,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요!',
    animal: '북극곰',
    likes: 1234,
  },
];

export default function IdeaList() {
  return (
    <div className="flex flex-col items-center gap-[7.5rem] mb-20">
      <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-4 gap-y-10">
        {data.map(({ id, userName, date, title, desc, animal, likes }) => (
          <Link href={`/idea/${id}`} className="flex flex-col w-72 " key={id}>
            <div className="bg-sub2 rounded-t-lg text-center relative h-[250px]">
              {/* 이미지 태그로 변경 필요 */}
              <div>이미지 영역</div>
              <div className="absolute text-green bottom-4 right-4 flex flex-col items-center rounded-lg bg-white px-3 py-2">
                <Image priority src={heartIcon} alt="Like this idea" />
                <p className="text-sm ">{likes}</p>
              </div>
            </div>
            <div className="flex flex-col px-3 py-6 rounded-b-lg shadow-lg ">
              <p className="text-sm opacity-50 ">
                {userName} | {new Date(date).toLocaleDateString()}
              </p>
              <p className="mt-3 w-full text-lg font-bold text-ellipsis overflow-hidden whitespace-nowrap">{title}</p>
              <p className="mt-2 w-full opacity-50">{desc}</p>
              <div className="max-w-fit px-4 py-1 rounded bg-lightblue mt-4">
                <p className="text-blue text-sm ">{animal}을 위한 챌린지</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Button btnType="borderBlack" size="small" buttonStyle="py-2 px-8 text-xl" rounded>
        더보기
        <AiOutlineArrowRight size={20} />
      </Button>
    </div>
  );
}
