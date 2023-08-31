import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';

import type { AnimalMap } from '@/types/db.type';

export default function RankingGuide() {
  const animals: AnimalMap = {
    1: '물범',
    2: '호랑이',
    3: '북극곰',
  };

  const session = useSessionStore((state: { session: any }) => state.session);
  const [showRankGuide, setShowRankGuide] = useState(false);

  const { data: userProfile } = useQuery(['userProfile', session?.user.id], async () => {
    const response = await supabase.from('users').select('*').eq('user_id', session?.user.id);
    return response.data?.[0];
  });

  return (
    <div>
      <div onMouseEnter={() => setShowRankGuide(true)} onMouseLeave={() => setShowRankGuide(false)} style={{ cursor: 'pointer' }}>
        <div className="flex ax-w-fit px-2 opacity-50">
          <p className="text-black text-sm">{animals[userProfile?.rank]} 마스터ⓘ</p>
        </div>
      </div>
      {showRankGuide && (
        <div className="absolute bg-white p-2 border rounded shadow">
          <p className="font-semibold">등급별 혜택</p>
          <div className="flex justify-between gap-4 py-1 mx-2">
            <p className="text-lg font-bold">챌린지 1회 달성 시</p>
            <p className="text-base font-regular">{animals[1]} 수호신 승급 | 나무 10그루 지급</p>
          </div>
          <div className="flex justify-between gap-4 py-1 mx-2">
            <p>챌린지 5회 달성 시</p>
            <p>{animals[2]} 수호신 승급 | 나무 30그루 지급</p>
          </div>
          <div className="flex justify-between gap-4 py-1 mx-2">
            <p>챌린지 10회 달성 시</p>
            <p>{animals[3]} 마스터 승급 | 나무 50그루 지급</p>
          </div>
        </div>
      )}
    </div>
  );
}
