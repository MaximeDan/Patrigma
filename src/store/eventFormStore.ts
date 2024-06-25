import { create } from "zustand";

interface EventFormStore {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

export const useEventFormStore = create<EventFormStore>((set) => ({
  isVisible: false,
  showModal: () => {
    const body = document.querySelector("body");
    body?.classList.add("overflow-hidden");
    set({ isVisible: true });
  },
  hideModal: () => {
    const body = document.querySelector("body");
    body?.classList.remove("overflow-hidden");
    set({ isVisible: false });
  },
  bottomSheetVisible: false,
}));
