import { create } from 'zustand';

const useStore = create((set) => ({
  modal: {
    isModalOpen: false,
    data: {},
  },
  openModal: () => set((state) => ({ modal: { ...state.modal, isModalOpen: true } })),
  closeModal: () => set((state) => ({ modal: { ...state.modal, isModalOpen: false } })),
  getData: (data) => set((state) => ({ modal: { ...state.modal, data }})),
}));

export default useStore;