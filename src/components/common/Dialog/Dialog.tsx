'use client';
import { type MouseEvent } from 'react';

import { useLockBodyScroll } from '@/hooks';

interface DiologProps {
  onClose: () => void;
  onSuccess?: (event: MouseEvent<HTMLElement>) => void;
  type: string;
  mainText: string;
  subText?: string;
  animal?: string;
}

export const Dialog = ({ onClose, onSuccess, type, mainText, subText, animal }: DiologProps) => {
  const close = (event: MouseEvent<HTMLElement>) => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  useLockBodyScroll(true);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black/30" onClick={close}>
      <div className="flex flex-col items-center justify-center gap-10 absolute top-[50%] left-[50%] -translate-x-center -translate-y-center bg-white rounded-[8px] p-[48px] ">
        {animal && (
          <div className="max-w-fit px-8 py-2 rounded bg-lightblue mx-auto">
            <p className="text-blue text-lg font-bold ">{animal}을 위한 챌린지</p>
          </div>
        )}
        <h3>{mainText}</h3>
        <p className="text-lg font-medium text-black opacity-50 text-center">{subText}</p>
        {type === 'Confirm' && onSuccess != undefined ? (
          <div className="flex items-center justify-center">
            <button className="py-2 px-8 bg-white text-navy rounded-lg" onClick={onClose}>
              취소
            </button>
            <button className="py-2 px-8 bg-navy text-white rounded-lg" onClick={onSuccess}>
              확인
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <button className="py-2 px-8 bg-navy text-white rounded-lg" onClick={close}>
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
