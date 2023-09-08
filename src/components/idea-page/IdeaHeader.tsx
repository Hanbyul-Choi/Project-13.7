'use client';

import { useRouter } from 'next/navigation';

import useSessionStore from '@/store/sesson.store';
import useSortWayStore from '@/store/sortway.store';

import { Button, useDialog } from '../common';

export function IdeaHeader() {
  const { Alert } = useDialog();
  const { session } = useSessionStore();
  const { sortWay, setLatest, setPopular } = useSortWayStore();
  const route = useRouter();

  const clickSuggestionButton = () => {
    if (!session) return Alert('로그인 후 이용 가능합니다.');
    route.push('/idea/post');
  };

  return (
    <div className="w-full flex justify-between items-center mt-10 pb-4 border-b-2 border-opacityblack">
      <div className="flex gap-6 items-center">
        <h5 className={`text-lg cursor-pointer ${sortWay === '추천순' ? '' : 'text-sub6'}`} onClick={setPopular}>
          추천순
        </h5>
        <h5 className={`text-lg cursor-pointer ${sortWay === '최신순' ? '' : 'text-sub6'}`} onClick={setLatest}>
          최신순
        </h5>
      </div>
      {/* <div className="flex">
        {countDown ? (
          <>
            <p className="text-lg font-medium flex">투표마감까지 남은 시간 : &nbsp; </p>
            <h5 className="w-48">{countDown}</h5>
          </>
        ) : (
          <h5>투표가 종료되었습니다.</h5>
        )}
      </div> */}
      <Button btnType="black" size="large-mo" onClick={clickSuggestionButton}>
        챌린지 제안하기
      </Button>
    </div>
  );
}
