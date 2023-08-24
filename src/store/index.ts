// 상태 관리
import { create } from 'zustand';

import type { Session } from '@supabase/supabase-js';

interface SessionStore {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
  signOut: () => void;
}

const useSessionStore = create<SessionStore>(set => ({
  session: null,
  setSession: newSession => set({ session: newSession }),
  signOut: () => set({ session: null }),
}));

export default useSessionStore;
