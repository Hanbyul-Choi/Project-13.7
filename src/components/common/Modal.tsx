'use client';
import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { useModalStore } from '@/store/modal.store';

type ModalProps = {
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children }) => {
  const [isCSR, setIsCSR] = useState<boolean>(false);
  const { isOpen, closeModal, isOpenMainModal, mainCloseModal, isOpenSubModal, subCloseModal, isOpenSub2Modal, sub2CloseModal } = useModalStore(
    state => state,
  );

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
          <div onMouseDown={() => closeModal()} className="fixed top-0 left-0 w-full h-full bg-[#00000060] z-20">
            <div
              onMouseDown={e => e.stopPropagation()}
              className="max-h-[915px] bg-white top-1/2 left-1/2 absolute -translate-x-center -translate-y-center py-10 px-8 flex flex-col justify-center items-start rounded-2xl z-30 sm:px-20 "
            >
              {children}
            </div>
          </div>,
          document.getElementById('modal-portal') as HTMLDivElement,
          // document.body,
        )}

      {isOpenMainModal &&
        createPortal(
          <div onMouseDown={() => mainCloseModal()} className="fixed top-0 left-0 w-full h-full bg-[#00000060] z-20">
            <div
              onMouseDown={e => e.stopPropagation()}
              className="max-h-[915px] bg-white top-1/2 left-1/2 absolute -translate-x-center -translate-y-center px-10 py-2 flex z-30 sm:flex-col justify-center items-start rounded-2xl sm:py-8"
            >
              {children}
            </div>
          </div>,
          document.getElementById('modal-portal') as HTMLDivElement,
          // document.body,
        )}

      {isOpenSubModal &&
        createPortal(
          <div onClick={() => subCloseModal()} className="fixed top-0 left-0 w-full h-full bg-[#00000060] z-20">
            <div
              onClick={e => e.stopPropagation()}
              className="max-h-[915px] bg-white top-1/2 left-1/2 absolute -translate-x-center -translate-y-center px-10 py-2 flex z-30 sm:flex-col justify-center items-start rounded-2xl sm:py-8"
            >
              {children}
            </div>
          </div>,
          document.getElementById('modal-portal') as HTMLDivElement,
          // document.body,
        )}
      {isOpenSub2Modal &&
        createPortal(
          <div onClick={() => sub2CloseModal()} className="fixed top-0 left-0 w-full h-full bg-[#00000060] z-20">
            <div
              onClick={e => e.stopPropagation()}
              className="bg-white top-1/2 left-1/2 absolute -translate-x-center -translate-y-center px-10 py-2 flex z-30 sm:flex-col justify-center items-start rounded-2xl sm:py-8"
            >
              {children}
            </div>
          </div>,
          document.getElementById('modal-portal') as HTMLDivElement,
          // document.body,
        )}
    </>
  );
};

export default Modal;
