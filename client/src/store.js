import { create } from 'zustand';

const useStore = create((set) => ({
  modal: {
    isModalOpen: false,
    data: {},
  },
  alert: {
    isModalOpen: false,
    data: {type: "success", message: "Yeni bir event eklendi"},
  },
  openModal: () => set((state) => ({ modal: { ...state.modal, isModalOpen: true } })),
  closeModal: () => set((state) => ({ modal: { ...state.modal, isModalOpen: false } })),
  getData: (data) => set((state) => ({ modal: { ...state.modal, data }})),
  openAlert: () => set((state) => ({ alert: { ...state.alert, isModalOpen: true } })),
  closeAlert: () => set((state) => ({ alert: { ...state.alert, isModalOpen: false } })),
  getAlertData: (data) => set((state) => ({ alert: { ...state.alert, data }})),
}));

export default useStore;