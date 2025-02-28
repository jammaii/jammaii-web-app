import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserResponse } from "@/features/users/types/app";

interface UserState {
  user: UserResponse | null;
  setUser: (user: UserResponse) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    },
  ),
);
