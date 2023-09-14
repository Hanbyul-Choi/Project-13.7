'use client';
import React from 'react';

import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';

import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { Button } from '../common';
import Modal from '../common/Modal';
import { animals, getRank } from '../main-page/Ranking';

import type { HowToRankUp } from '@/types/db.type';

export const rankingGuideArray: HowToRankUp[] = [
  { title: '회원 가입 시', animals: '두루미 수호신 승급', trees: 25 },
  { title: '챌린지 1회 달성 시', animals: '물범 수호신 승급', trees: 10 },
  { title: '챌린지 5회 달성 시', animals: '호랑이 수호신 승급', trees: 25 },
  { title: '챌린지 10회 달성 시', animals: '북극곰 마스터 승급', trees: 40 },
];

export default function RankingGuide() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const route = useRouter();

  const { subOpenModal, isOpenSubModal, subCloseModal } = useModalStore(state => state);
  const onClickRankingGuide = () => {
    subOpenModal();
    console.log('openSubModal:', isOpenSubModal);
  };

  const onClickToJoinChallenge = () => {
    route.push('/challenge');
  };

  if (!session) return redirect('/');
  const { rank } = session;

  const userTitle = animals[getRank(rank)];

  return (
    <div>
      <button onClick={onClickRankingGuide}>
        <div className="flex ax-w-fit px-2 opacity-50">
          <p className="text-black text-sm">{userTitle} ⓘ</p>
        </div>
      </button>
      {isOpenSubModal && (
        <Modal>
          <div className="md:w-[29rem] w-[24rem] flex flex-col px-2 justify-evenly">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold py-2">등급별 혜택</p>
              <button onClick={subCloseModal}>
                <AiOutlineClose size={25} />
              </button>
            </div>
            <div className="border-t border-black opacity-25 mb-6 justify-between"></div>
            {rankingGuideArray.map((item: HowToRankUp) => (
              <ul key={item.title} className="flex items-center justify-between gap-2 md:bg-sub1 rounded-lg md:px-6 md:py-4 md:mb-3">
                <li className="text-lg font-semibold">{item.title}</li>
                <ul className="flex justify-evenly">
                  <li className="text-sub6 text-sm mr-1">{item.animals} |</li>
                  <li className="text-sub6 text-sm">나무 {item.trees} 그루 지급</li>
                </ul>
              </ul>
            ))}
            <div className="mt-6" onClick={subCloseModal}>
              <Button onClick={onClickToJoinChallenge} btnType={'primary'} size={'full'}>
                챌린지 참여하기
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
