'use client';
import React, { useState } from 'react';

import { redirect } from 'next/navigation';

import useSessionStore from '@/store/sesson.store';

import { animals, getRank } from '../main-page/Ranking';

export default function RankingGuide() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [showRankGuide, setShowRankGuide] = useState(false);
  if (!session) return redirect('/');
  const { rank } = session;

  const userTitle = animals[getRank(rank)];

  return (
    <div>
      <div onMouseEnter={() => setShowRankGuide(true)} onMouseLeave={() => setShowRankGuide(false)} style={{ cursor: 'pointer' }}>
        <div className="flex ax-w-fit px-2 opacity-50">
          <p className="text-black text-sm">{userTitle} ⓘ</p>
        </div>
      </div>{' '}
      {showRankGuide && (
        <div className="top-[50%] left-[50%] -translate-x-center -translate-y-center lg:-translate-x-[1%] lg:-translate-y-[50%] z-10 fixed bg-white border rounded shadow sm:w-[40rem] w-[30rem] p-8 pt-4 pb-8">
          <p className="font-semibold my-4 text-lg">등급별 혜택</p>
          <div className="border-t border-black opacity-25 mb-6"></div>
          <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <p className="text-base font-bold">회원 가입 시</p>
            <p className="text-sub6 text-base">두루미 수호신 승급 | 나무 25그루 지급</p>
          </div>
          <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <p className="text-base font-bold">챌린지 1회 달성 시</p>
            <p className="text-sub6 text-base">{animals[1]} 승급 | 나무 10그루 지급</p>
          </div>
          <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <p className="text-base font-bold">챌린지 5회 달성 시</p>
            <p className="text-sub6 text-base">{animals[2]} 승급 | 나무 25그루 지급</p>
          </div>
          <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
            <p className="text-base font-bold">챌린지 10회 달성 시</p>
            <p className="text-sub6 text-base">{animals[3]} 승급 | 나무 40그루 지급</p>
          </div>
        </div>
      )}
    </div>
  );
}
