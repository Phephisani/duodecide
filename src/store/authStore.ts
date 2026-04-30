import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  coupleId: string | null;
  setUser: (user: any) => void;
  setCoupleId: (id: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  coupleId: null,
  setUser: (user) => set({ user }),
  setCoupleId: (id) => set({ coupleId: id }),
  logout: () => set({ user: null, coupleId: null }),
}));
