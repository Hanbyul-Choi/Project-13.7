import { create } from 'zustand';

interface ModalOpen {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalOpen>()(set => ({
  isOpen: false,
  openModal: () => {
    return set({ isOpen: true });
  },
  closeModal: () => {
    return set({ isOpen: false });
  },
}));
