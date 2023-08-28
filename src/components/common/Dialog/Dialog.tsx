'use client';
import { type MouseEvent } from 'react';

import { useLockBodyScroll } from '@/hooks';

import { Button } from '..';

interface DiologProps {
  onClose: () => void;
  onSuccess?: (event: MouseEvent<HTMLElement>) => void;
  type: string;
  mainText: string;
  subText?: string;
}

export const Dialog = ({ onClose, onSuccess, type, mainText, subText }: DiologProps) => {
  const close = (event: MouseEvent<HTMLElement>) => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  useLockBodyScroll(true);

  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/40" onClick={close}>
      <div className="flex flex-col gap-8 absolute top-[50%] left-[50%] -translate-x-center -translate-y-center bg-white rounded-[8px] p-10 ">
        <div className="border-b-[1px] border-opacityblack ">
          <h5 className="font-semibold text-blue pb-4 w-80">알림</h5>
        </div>
        <div>
          <h5 className="font-semibold">{mainText}</h5>
          <p className="text-sm font-medium text-black opacity-50 mt-1">{subText}</p>
        </div>
        {type === 'Confirm' && onSuccess != undefined ? (
          <div className="flex items-center justify-end gap-2">
            <Button btnType="cancel" size="small" onClick={onClose}>
              취소
            </Button>
            <Button btnType="black" size="small" onClick={onSuccess}>
              확인
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-end">
            <Button btnType="black" size="small" onClick={close}>
              확인
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
