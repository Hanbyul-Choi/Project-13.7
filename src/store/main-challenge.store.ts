import { create } from 'zustand';

import type { Tables } from '@/types/supabase.type';

interface MainChallengeType {
  mainChallenge: Tables<'mainChallenge'> | null;
  setMainChallenge: (mainChllenge: Tables<'mainChallenge'>) => void;
}

const useMainChallengeStore = create<MainChallengeType>(set => ({
  mainChallenge: null,
  setMainChallenge: mainChallenge => set({ mainChallenge }),
}));

export default useMainChallengeStore;
