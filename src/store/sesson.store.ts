import { create } from 'zustand';

import type { User } from '@/types/db.type';

interface SessionStore {
  session: User | null;
  setSession: (newSession: User | null) => void;
  signOut: () => void;
}

const useSessionStore = create<SessionStore>(set => ({
  session: null,
  setSession: newSession => set({ session: newSession }),
  signOut: () => set({ session: null }),
}));

export default useSessionStore;
