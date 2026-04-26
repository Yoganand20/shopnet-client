import { create } from "zustand";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

const initialState = { user: null, loading: false };

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
}));
