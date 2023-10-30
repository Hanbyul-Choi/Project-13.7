'use client';
import React, { useEffect, useRef } from 'react';

interface TostProps {
  text: string;
  unmount: () => void;
}

function Toast({ text, unmount }: TostProps) {
  const toastRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.classList.add('animate-[rightIn_1s_ease-in-out_forwards]');
    }

    const timeoutId = setTimeout(() => {
      if (toastRef.current) {
        toastRef.current.classList.remove('animate-[rightIn_1s_ease-in-out_forwards]');
        toastRef.current.classList.add('animate-[rightOut_1s_ease-in-out]');
      }
    }, 6000);
    const toastUnmount = setTimeout(() => {
      unmount();
    }, 10000);

    return () => {
      clearTimeout(timeoutId), clearTimeout(toastUnmount);
    };
  }, [unmount]);

  return (
    <div
      ref={toastRef}
      className={`w-[250px] text-center fixed top-[3.125rem] right-[-250px] z-20 bg-[#cce9f7d2] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] overflow-hidden`}
    >
      <p className="m-[20px] whitespace-nowrap">{text}</p>
      <div className="flex justify-center items-center">
        <div className="w-full h-[4px] bg-green animate-[leftOut_5s_ease-in-out_1s_forwards]" />
      </div>
    </div>
  );
}

export default Toast;
