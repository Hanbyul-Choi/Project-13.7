import { create } from 'zustand';

interface ModalOpen {
  isOpen: boolean;
  isOpenMainModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  mainOpenModal: () => void;
  mainCloseModal: () => void;
}

export const useModalStore = create<ModalOpen>()(set => ({
  isOpen: false,
  isOpenMainModal: false,

  openModal: () => {
    return set({ isOpen: true, isOpenMainModal: false });
  },
  closeModal: () => {
    return set({ isOpen: false });
  },
  mainOpenModal: () => {
    return set({ isOpen: false, isOpenMainModal: true });
  },
  mainCloseModal: () => {
    return set({ isOpenMainModal: false });
  },
}));
