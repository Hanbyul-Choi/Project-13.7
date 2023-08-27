'use client';

import Link from 'next/link';

import Button from '../common/Button';

import type { SortWay } from './IdeaList';

interface Props {
  sortWay: SortWay;
  setSortway: React.Dispatch<React.SetStateAction<SortWay>>;
}

export default function IdeaHeader({ sortWay, setSortway }: Props) {
  return (
    <div className="w-full flex justify-between items-center mt-10 pb-4 border-b-2 border-opacityblack">
      <div className="flex">
        <p className="text-lg font-medium flex">투표마감까지 남은 시간 : </p>
        <h5>&nbsp; {'16시간 12분'}</h5>
      </div>
      <div className="flex gap-6 items-center">
        <h5
          className={`cursor-pointer ${sortWay === '추천순' ? '' : 'text-sub6'}`}
          onClick={() => {
            setSortway('추천순');
          }}
        >
          추천순
        </h5>
        <h5
          className={`cursor-pointer ${sortWay === '최신순' ? '' : 'text-sub6'}`}
          onClick={() => {
            setSortway('최신순');
          }}
        >
          최신순
        </h5>
        <Link href="/idea/post">
          <Button btnType="black" size="large">
            챌린지 제안하기
          </Button>
        </Link>
      </div>
    </div>
  );
}
