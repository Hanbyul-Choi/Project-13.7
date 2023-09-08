'use client';
import React, { useState } from 'react';

import { redirect } from 'next/navigation';

import useSessionStore from '@/store/sesson.store';

import { animals } from '../main-page/Ranking';

export default function RankingGuide() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [showRankGuide, setShowRankGuide] = useState(false);
  if (!session) return redirect('/');
  const { rank } = session;
  const userTitle = animals[rank >= 10 ? 3 : rank >= 5 ? 2 : rank >= 1 ? 1 : 0];

  return (
    <div>
      <div onMouseEnter={() => setShowRankGuide(true)} onMouseLeave={() => setShowRankGuide(false)} style={{ cursor: 'pointer' }}>
        <div className="flex ax-w-fit px-2 opacity-50">
          <p className="text-black text-sm">{userTitle} ⓘ</p>
        </div>
      </div>
      <div className="fixed z-100 bg-white">
        {showRankGuide && (
          <div className="absolute bg-white border rounded shadow w-[40rem] p-8 pt-4 pb-8">
            <p className="font-semibold my-4 text-lg">등급별 혜택</p>
            <div className="border-t border-black opacity-25 mb-6"></div>
            <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
              <p className="text-base font-bold">회원 가입 시</p>
              <p className="text-sub6 text-base">거북이 수호신 승급 | 나무 25그루 지급</p>
            </div>
            <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
              <p className="text-base font-bold">챌린지 1회 달성 시</p>
              <p className="text-sub6 text-base">{animals[1]} 수호신 승급 | 나무 10그루 지급</p>
            </div>
            <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
              <p className="text-base font-bold">챌린지 5회 달성 시</p>
              <p className="text-sub6 text-base">{animals[2]} 수호신 승급 | 나무 25그루 지급</p>
            </div>
            <div className="flex item-center justify-between gap-2 bg-sub1 rounded-lg px-8 py-4 mb-3">
              <p className="text-base font-bold">챌린지 10회 달성 시</p>
              <p className="text-sub6 text-base">{animals[3]} 마스터 승급 | 나무 40그루 지급</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
