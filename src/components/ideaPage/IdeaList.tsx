import React from 'react';

const data = [
  {
    id: 1,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 2,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 3,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 4,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 5,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 6,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 7,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 8,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 9,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
  {
    id: 10,
    userName: 'userName',
    date: Date.now(),
    title: '모두 함께 일회용품 사용을 줄여보아요 글자잘림 테스트 글자잘림 테스트',
    desc: '텀블러 사용으로 일회용컵 쓰레기 줄이기 챌린지 도전해요! 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트 글자잘림 테스트',
    animal: '북극곰',
  },
];

export default function IdeaList() {
  return (
    <div className="grid grid-cols-4 mt-20 gap-4">
      {data.map(item => (
        <div className="flex flex-col" key={item.id}>
          <div className="bg-sub2 min-w-[17rem] h-[14.5rem]">이미지 영역</div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
