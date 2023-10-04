import { CardProps } from "@/components/Card";
import { create } from "zustand";

interface StoreState {
  viewedCards: CardProps[];
  addToViewedCards: (card: CardProps) => void;
  resetCards: () => void;
}

export const useStore = create<StoreState>((set: any) => ({
  viewedCards: [],
  addToViewedCards: (card: any) =>
    set((state: any) => ({ viewedCards: [...state.viewedCards, card] })),
  resetCards: () => set({ viewedCards: [] }),
}));
