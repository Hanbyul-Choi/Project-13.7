import { create } from 'zustand';

interface ModalOpen {
  isOpen: boolean;
  isOpenMainModal: boolean;
  isOpenSubModal: boolean;
  isOpenSub2Modal: boolean;
  openModal: () => void;
  closeModal: () => void;
  mainOpenModal: () => void;
  mainCloseModal: () => void;
  subOpenModal: () => void;
  subCloseModal: () => void;
  sub2OpenModal: () => void;
  sub2CloseModal: () => void;
}

export const useModalStore = create<ModalOpen>()(set => ({
  isOpen: false,
  isOpenMainModal: false,
  isOpenSubModal: false,
  isOpenSub2Modal: false,

  openModal: () => {
    return set({ isOpen: true, isOpenMainModal: false, isOpenSubModal: false, isOpenSub2Modal: false });
  },
  closeModal: () => {
    return set({ isOpen: false });
  },
  mainOpenModal: () => {
    return set({ isOpen: false, isOpenMainModal: true, isOpenSubModal: false, isOpenSub2Modal: false });
  },
  mainCloseModal: () => {
    return set({ isOpenMainModal: false });
  },
  subOpenModal: () => {
    return set({ isOpen: false, isOpenMainModal: false, isOpenSubModal: true, isOpenSub2Modal: false });
  },
  subCloseModal: () => {
    return set({ isOpenSubModal: false });
  },
  sub2OpenModal: () => {
    return set({ isOpen: false, isOpenMainModal: false, isOpenSubModal: false, isOpenSub2Modal: true });
  },
  sub2CloseModal: () => {
    return set({ isOpenSub2Modal: false });
  },
}));
