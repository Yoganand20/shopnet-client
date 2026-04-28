import type { User } from "@/lib/types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

const initialState = { user: null, loading: false };

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
}));
