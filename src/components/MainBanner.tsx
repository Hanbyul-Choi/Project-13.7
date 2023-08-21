import React from 'react';

import Link from 'next/link';
import { AiOutlineArrowRight } from 'react-icons/ai';

export default function MainBanner() {
  return (
    <div className="w-full h-[670px] bg-navy">
      <div className="ml-[10vw] mt-[10vh]">
        <p className="max-w-fit px-6 py-1 border-[1px] border-white text-lg text-white">이달의 챌린지</p>
        <p className="text-white text-[3.5rem] mt-12">위기에 빠진 북극곰을 도와주세요!</p>
        <h5 className="text-sub6 font-semibold mt-4">
          거리에 자동차가 많아지면 이산화탄소 배출량이 늘어나 지구의 온도가 높아져요. <br />
          우리 함께 가까운 거리는 걷거나 대중교통 이용해볼까요?
        </h5>
        <Link href="challenge">
          <button className="text-white mt-10 flex items-center gap-1 bg-green rounded-full px-8 py-2">
            챌린지 참여하기
            <AiOutlineArrowRight size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
}
