import { create } from "zustand";

interface AddStepFormValues {
  puzzle: string;
  answer: string;
  hint: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface EditedStep extends AddStepFormValues {
  index: number;
}

interface JourneyFormStore {
  isVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
  bottomSheetVisible: boolean;
  showBottomSheet: () => void;
  hideBottomSheet: () => void;
  steps: AddStepFormValues[];
  addStep: (step: AddStepFormValues) => void;
  removeStep: (index: number) => void;
  editStep: (step: AddStepFormValues, index: number) => void;
  editedStep: EditedStep | null;
  setEditedStep: (step: EditedStep | null) => void;
}

export const useJourneyFormStore = create<JourneyFormStore>((set) => ({
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
  showBottomSheet: () => {
    set({ bottomSheetVisible: true });
  },
  hideBottomSheet: () => {
    set({ bottomSheetVisible: false });
  },
  steps: [],
  addStep: (step) => {
    set((state) => ({ steps: [...state.steps, step] }));
  },
  removeStep: (index) => {
    set((state) => ({
      steps: state.steps.filter((_, loopIndex) => loopIndex !== index),
    }));
  },
  editStep: (step, index) => {
    set((state) => ({
      steps: state.steps.map((currentStep, loopIndex) =>
        loopIndex === index ? step : currentStep
      ),
    }));
  },
  editedStep: null,
  setEditedStep: (step) => {
    set({ editedStep: step });
  },
}));
