import React from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '../common';

type SingleLayoutProps = {
  title: string;
  animal?: string;
  children: React.ReactNode;
  size?: boolean;
};

const SingleLayout: React.FC<SingleLayoutProps> = ({ title, children, animal, size }) => {
  const router = useRouter();
  const sizeControl = size ? 'py-[50px]' : 'h-[calc(100vh-96px)] items-center';

  return (
    <div className={`bg-[#F4F6F8] w-full flex justify-center flex-col ${sizeControl}`}>
      <div className="inline-block py-16 px-20 bg-[white] shadow-[0_1px_5px_-0px_rgba(53, 60, 73, 0.08)] w-[49.75rem] h-[fit-content] m-auto relative">
        {animal && <p className="text-sm text-blue leading-[150%] font-medium py-1 px-4 bg-[#d4e0f9] inline-block rounded mb-2.5 ">{animal} 위한 챌린지</p>}
        <h3>{title}</h3>
        <hr className="w-full mt-6 mb-10 border border-blue" />
        {children}
      </div>
      <Button onClick={() => router.back()} btnType="borderBlack" rounded={true} size="large" buttonStyle="w-[fit-content] m-auto mt-10">
        목록보기
      </Button>
    </div>
  );
};

export default SingleLayout;
