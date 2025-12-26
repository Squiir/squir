import { create } from "zustand";

type SocialState = {
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  isRightPanelOpen: boolean;
  setRightPanelOpen: (v: boolean) => void;
};

export const useSocialStore = create<SocialState>((set) => ({
  activeConversationId: null,
  setActiveConversationId: (id) => set({ activeConversationId: id }),

  isRightPanelOpen: true,
  setRightPanelOpen: (v) => set({ isRightPanelOpen: v }),
}));
