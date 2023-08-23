// 상태 관리
import { create } from 'zustand';

import type { Session } from '@supabase/supabase-js';

interface SessionStore {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

const useSessionStore = create<SessionStore>(set => ({
  session: null,
  setSession: newSession => set({ session: newSession }),
}));

export default useSessionStore;
