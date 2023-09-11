import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import list from '../../../public/list.svg';

function ListButton({ href }: { href: string }) {
  return (
    <Link href={href} className="flex gap-1 mx-auto mt-20 px-8 py-2 border-[1px] w-fit rounded-lg border-black">
      <Image src={list} alt="backToListImg" />
      <h6>목록보기</h6>
    </Link>
  );
}

export default ListButton;
