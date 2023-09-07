import React from 'react';

import Link from 'next/link';

function ReveiwList({ item }) {
  return (
    <ul key={item.post_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-6 py-3 mb-3">
      <li className="text-lg">{item.mainChallenge?.title}</li>
      <li className="text-base opacity-50">{item.created_at ? item.created_at.slice(0, 10) : ''}</li>
      <button className="bg-opacityblack w-20 py-1 text-center rounded text-base text-sub8">
        <Link href={item?.insta_url}>바로가기</Link>
      </button>
    </ul>
  );
}

export default ReveiwList;
