import { create } from "zustand";

interface AppState {
  loading: boolean;
  message: string;
  setLoading: (loading: boolean, message?: string) => void;
}

const initialState = { loading: false, message: "Loading..." };

export const useAppStore = create<AppState>()((set) => ({
  ...initialState,
  setLoading: (loading, message = "Loading") =>
    set(() => ({ loading, message })),
}));
