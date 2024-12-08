import { create } from "zustand";

interface FeedbackState {
  message: string | null;
  isVisible: boolean;
  setMessage: (message: string) => void;
  setVisibility: (isVisible: boolean) => void;
  clearFeedback: () => void;
}

export const useFeedbackStore = create<FeedbackState>((set) => ({
  message: null,
  isVisible: false,
  setMessage: (message: string) => set({ message, isVisible: true }),
  setVisibility: (isVisible: boolean) => set({ isVisible }),
  clearFeedback: () => set({ message: null, isVisible: false }),
}));

/* Författare: Isak
 *
 * Store för att hantera visibility samt message content för feedback componenten
 */
