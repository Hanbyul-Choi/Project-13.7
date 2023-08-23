import React from 'react';

type SingleLayoutProps = {
  title: string;
  animal?: string;
  children: React.ReactNode;
};

const SingleLayout: React.FC<SingleLayoutProps> = ({ title, children, animal }) => {
  return (
    <div className="bg-[#F4F6F8] w-full h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="inline-block p-16 bg-[white] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] w-[47.75rem]">
        {animal && <p className="text-sm text-blue leading-[150%] font-medium py-1 px-4 bg-[#d4e0f9] inline-block rounded mb-2.5 ">{animal} 위한 챌린지</p>}
        <h3>{title}</h3>
        <hr className="w-full mt-6 mb-10 border border-blue" />
        {children}
      </div>
    </div>
  );
};

export default SingleLayout;
