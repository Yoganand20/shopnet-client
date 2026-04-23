import { create } from "zustand";

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
}

const initialState = { user: null, loading: false };

export const useAuthStore = create<AuthState>()((set) => ({
  ...initialState,
  setUser: (user) => set(() => ({ user })),
}));
