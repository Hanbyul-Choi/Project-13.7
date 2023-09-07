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
      <div className="fixed z-100">
        {showRankGuide && (
          <div className="absolute bg-white border rounded shadow w-[32rem] p-2 m-2">
            <p className="font-semibold my-4">등급별 혜택</p>
            <div className="flex flex-col justify-between gap-2 py-1 mx-4">
              <p className="text-lg font-bold">챌린지 1회 달성 시</p>
              <p className="text-base font-regular mb-2">{animals[1]} 수호신 승급 | 나무 10그루 지급</p>
            </div>
            <div className="flex flex-col justify-between gap-2 py-1 mx-4">
              <p className="text-lg font-bold">챌린지 5회 달성 시</p>
              <p className="text-base font-regular mb-2">{animals[2]} 수호신 승급 | 나무 30그루 지급</p>
            </div>
            <div className="flex flex-col justify-between gap-2 py-1 mx-4">
              <p className="text-lg font-bold">챌린지 10회 달성 시</p>
              <p className="text-base font-regular mb-4">{animals[3]} 마스터 승급 | 나무 50그루 지급</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
