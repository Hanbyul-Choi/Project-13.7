'use client';
import React from 'react';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getTotalNumberDonation } from '@/app/api/mypage';
import { TOTAL_DONATION } from '@/app/shared/queries.keys';

export const totalTreeMeans = '나무를 지급하고 기부받으며 모은 나무는 돈으로 환산하여 기부합니다.';

export default function TotalTreeNumber() {
  const [openTreeInfo, setOpenTreeInfo] = useState(false);
  let { data: curTotalTrees } = useQuery([TOTAL_DONATION], getTotalNumberDonation);

  const openTotalTreeHandler = () => {
    setOpenTreeInfo(true);
  };
  const closeTotalTreeHandler = () => {
    setOpenTreeInfo(false);
  };

  return (
    <>
      <div className="w-full p-4 gap-2 justify-center text-center items-center bg-sub1">
        {openTreeInfo ? (
          <>
            <div className="flex justify-center">
              <p className="font-semibold text-black">
                지금까지 모인 나무 🌳 <strong>{curTotalTrees}</strong> 그루
              </p>
              <p className="cursor-pointer ml-1" onClick={closeTotalTreeHandler}>
                ⓘ
              </p>
            </div>
            <div className="mt-2">
              <p>Project 13.7에서는 활동을 통해 나무를 얻을 수 있으며, 나무를 사용해 챌린지에 참여하거나 후원하실 수 있습니다. </p>
              <p>모인 나무들은 세계자연기금 WWF를 통해 후원됩니다.</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <p className="font-semibold text-black">
                지금까지 모인 나무 🌳 <strong>{curTotalTrees}</strong> 그루
              </p>
              <p className="cursor-pointer ml-1" onClick={openTotalTreeHandler}>
                ⓘ
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
