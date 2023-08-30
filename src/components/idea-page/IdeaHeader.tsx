'use client';

import { useRouter } from 'next/navigation';

import useSessionStore from '@/store/sesson.store';

import { Button, useDialog } from '../common';

import type { SortWay } from './IdeaList';

interface Props {
  sortWay: SortWay;
  setSortway: React.Dispatch<React.SetStateAction<SortWay>>;
}

export function IdeaHeader({ sortWay, setSortway }: Props) {
  const { Alert } = useDialog();
  const { session } = useSessionStore();
  const route = useRouter();

  const clickSuggestionButton = () => {
    if (!session) return Alert('로그인 후 이용 가능합니다.');
    route.push('/idea/post');
  };

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
        <Button btnType="black" size="large" onClick={clickSuggestionButton}>
          챌린지 제안하기
        </Button>
      </div>
    </div>
  );
}
