'use client';
import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { useModalStore } from '@/store/modal.store';

type ModalProps = {
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isCSR, setIsCSR] = useState<boolean>(false);
  const { isOpen, closeModal, isOpenMainModal, mainCloseModal } = useModalStore(state => state);

  useEffect(() => {
    setIsCSR(true);
  }, []);

  if (typeof window === 'undefined') return <></>;

  if (!isCSR) {
    return <></>;
  }

  return (
    <>
      {isOpen &&
        !isOpenMainModal &&
        createPortal(
          <div>
            <div onClick={() => closeModal()} className="fixed top-0 left-0 w-full h-full bg-[#00000060] z-20">
              <div onClick={e => e.stopPropagation()} className="bg-white fixed top-1/2 left-1/2 lg:px-[5.5rem] py-12 px-4 flex flex-col justify-center items-start rounded-2xl translate-x-[-50%] translate-y-[-50%] z-30">
                {children}
              </div>
            </div>
          </div>,
          document.getElementById('modal-portal') as HTMLDivElement,
          // document.body,
        )}

      {isOpenMainModal &&
        createPortal(
          <div>
            <div onClick={() => mainCloseModal()} className="fixed top-0 left-0 w-full h-full bg-[#00000060] z-20">
              <div
                onClick={e => e.stopPropagation()}
                className="bg-white top-1/2 sm:left-1/2 sm:fixed sm:py-8 sm:px-[5rem] relative px-3 py-1 mx-5 flex sm:flex-col justify-center items-start rounded-2xl sm:translate-x-[-50%] sm:translate-y-[-50%] translate-y-[-50%] z-30"
              >
                {/* bg-white fixed top-1/2 left-1/2 lg:px-[5.5rem] py-12 px-4 flex flex-col justify-center items-start rounded-2xl translate-x-[-50%] translate-y-[-50%] */}
                {children}
              </div>
            </div>
          </div>,
          document.getElementById('modal-portal') as HTMLDivElement,
          // document.body,
        )}
    </>
  );
};

export default Modal;
