'use client';
import React, { useEffect, useRef, useState } from 'react';

type DropDownProps = {
  editClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  deleteClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  position: string;
};

function DropDownBtn({ editClickHandler, deleteClickHandler, position }: DropDownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropBackgroundRef = useRef<HTMLDivElement>(null);
  const dropDownToggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsOpen(false);
  }, [editClickHandler]);

  useEffect(() => {
    const handleOutSideClose = (event: MouseEvent) => {
      if (isOpen && !dropBackgroundRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('click', handleOutSideClose);
    return () => document.removeEventListener('click', handleOutSideClose);
  }, [isOpen]);

  return (
    <div ref={dropBackgroundRef} className={`absolute flex flex-col ${position}`}>
      <div className="flex w-full justify-end mb-[8.5px]">
        <button className="bg-[url('/dropBtn.svg')] w-1 h-4 p-2 bg-no-repeat bg-center bg-contain indent-[-9999px]" onClick={dropDownToggle}>
          토글
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col px-2 py-3 border border-[#D8DCE2] bg-white shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] z-[5]">
          <button onClick={editClickHandler} className="w-16 h-[25px] text-lg leading-[140%] text-[#8E95A3] hover:bg-sub2">
            수정
          </button>
          <hr className="my-2" />
          <button onClick={deleteClickHandler} className="w-16 h-[25px] text-lg leading-[140%] text-[#8E95A3] hover:bg-sub2 hover:text-nagative">
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDownBtn;
