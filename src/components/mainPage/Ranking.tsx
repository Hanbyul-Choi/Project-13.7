import React from 'react';

const data = [
  {
    userName: 'hannah.G',
    title: '북극곰 마스터',
    challengeCount: 10,
  },
  {
    userName: 'hannah.G',
    title: '북극곰 마스터',
    challengeCount: 9,
  },
  {
    userName: 'hannah.G',
    title: '북극곰 마스터',
    challengeCount: 8,
  },
  {
    userName: 'hannah.G',
    title: '북극곰 마스터',
    challengeCount: 7,
  },
  {
    userName: 'hannah.G',
    title: '북극곰 마스터',
    challengeCount: 6,
  },
];

export default function Ranking() {
  const colorMatch = ['text-blue bg-lightblue', 'text-green bg-lightgreen', 'text-orange bg-lightorange', 'text-sub6 bg-lightsub6', 'text-sub6 bg-lightsub6'];

  return (
    <div className="border-b-2 mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Ranking</p>
      <h2 className="mt-4">베스트 챌린저 랭킹</h2>
      <div className="flex gap-1 overflow-hidden mt-10">
        {data.map((item, i) => (
          <div key={i} className="px-7 py-3 bg-white rounded-lg border-[1px]">
            <p className="text-black opacity-50">{item.userName}</p>
            <div className="flex items-center gap-3">
              <p className="text-lg">{item.title}</p>
              <div className={`rounded-[4px] py-1 px-3 ${colorMatch[i]}`}>{item.challengeCount}회 성공</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
