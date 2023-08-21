'use client';
import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { useModalStore } from '@/store/modalStore';

type ModalProps = {
  children: React.ReactElement;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isCSR, setIsCSR] = useState<boolean>(false);
  const { closeModal } = useModalStore(state => state);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  if (typeof window === 'undefined') return <></>;
  if (!isCSR) return <></>;
  return (
    <>
      {createPortal(
        <div>
          <div onClick={() => closeModal()} className=" absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-screen bg-black opacity-50"></div>
          <div className="bg-white absolute top-1/2 left-1/2 px-[5.5rem] py-12 flex flex-col justify-center items-start rounded-2xl translate-x-[-50%] translate-y-[-50%]">{children}</div>
        </div>,
        document.body,
        // document.getElementById('modal-portal') as HTMLDivElement,
      )}
    </>
  );
};

export default Modal;
