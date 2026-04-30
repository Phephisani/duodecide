import { create } from 'zustand';
import { DateSession, DateIdea } from '../types';

interface DateState {
  currentSession: DateSession | null;
  setSession: (session: DateSession | null) => void;
  updateMood: (partner: 'partner1' | 'partner2', mood: string) => void;
  addResults: (ideas: DateIdea[]) => void;
}

export const useDateStore = create<DateState>((set) => ({
  currentSession: null,
  setSession: (session) => set({ currentSession: session }),
  updateMood: (partner, mood) => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      mood: {
        ...state.currentSession.mood,
        [partner]: mood,
        agreed: state.currentSession.mood[partner === 'partner1' ? 'partner2' : 'partner1'] === mood
      }
    } : null
  })),
  addResults: (ideas) => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      results: ideas
    } : null
  })),
}));
