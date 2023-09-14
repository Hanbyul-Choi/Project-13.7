import { create } from 'zustand';

interface ModalOpen {
  isOpen: boolean;
  isOpenMainModal: boolean;
  isOpenSubModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  mainOpenModal: () => void;
  mainCloseModal: () => void;
  subOpenModal: () => void;
  subCloseModal: () => void;
}

export const useModalStore = create<ModalOpen>()(set => ({
  isOpen: false,
  isOpenMainModal: false,
  isOpenSubModal: false,

  openModal: () => {
    return set({ isOpen: true, isOpenMainModal: false, isOpenSubModal: false });
  },
  closeModal: () => {
    return set({ isOpen: false });
  },
  mainOpenModal: () => {
    return set({ isOpen: false, isOpenMainModal: true, isOpenSubModal: false });
  },
  mainCloseModal: () => {
    return set({ isOpenMainModal: false });
  },
  subOpenModal: () => {
    return set({ isOpen: false, isOpenMainModal: false, isOpenSubModal: true });
  },
  subCloseModal: () => {
    return set({ isOpenSubModal: false });
  },
}));
