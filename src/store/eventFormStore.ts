import { create } from "zustand";

interface EventFormStore {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
  journeyIdValue: number | null;
  setJourneyIdValue: (value: number | null) => void;
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
  journeyIdValue: null,
  setJourneyIdValue: (value) => set({ journeyIdValue: value }),
}));
