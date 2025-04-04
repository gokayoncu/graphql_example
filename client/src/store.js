import { create } from 'zustand';

const useStore = create((set) => {
  const initialUsers = JSON.parse(localStorage.getItem('users')) || {};
  return {
    modal: {
      isModalOpen: false,
      data: {},
    },
    users: initialUsers,
    alert: {
      isModalOpen: false,
      data: { type: "success", message: "Yeni bir event eklendi" },
    },
    openModal: () => set((state) => ({ modal: { ...state.modal, isModalOpen: true } })),
    closeModal: () => set((state) => ({ modal: { ...state.modal, isModalOpen: false } })),
    getData: (data) => set((state) => ({ modal: { ...state.modal, data } })),
    openAlert: () => set((state) => ({ alert: { ...state.alert, isModalOpen: true } })),
    closeAlert: () => set((state) => ({ alert: { ...state.alert, isModalOpen: false } })),
    getAlertData: (data) => set((state) => ({ alert: { ...state.alert, data } })),
    addUsers: (data) => {
      set((state) => {
        const updatedUsers = { ...state.users, ...data };
        localStorage.setItem('userInfo', JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      });
    },
  };
});

export default useStore;