'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getMyDonationHistory } from '@/app/api/mypage';
import { DONATION_HISTORY } from '@/app/shared/queries.keys';
import SingleLayout from '@/components/layout/SingleLayout';
import useSessionStore from '@/store/session.store';

export default function Page() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const { data: curUserDonations } = useQuery([DONATION_HISTORY], () => getMyDonationHistory(session?.user_id));

  console.log('curUserDonations', curUserDonations);
  return (
    <SingleLayout title="나의 🌳 후원내역">
      <div className="flex justify-between font-semibold mb-4 text-sub6">
        <p>후원한 🌳 개수</p>
        <p>후원 날짜 </p>
      </div>
      {curUserDonations?.map((item: any) => (
        <ul key={item.id} className="flex flex-row gap-1 py-2 justify-between">
          <li>
            <strong>{item.point}</strong> 그루
          </li>
          <li>후원 날짜: {item.created_at.slice(0, 10)}</li>
        </ul>
      ))}
    </SingleLayout>
  );
}
