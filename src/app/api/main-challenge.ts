import { supabase } from '../../../supabase/supabaseConfig';

// 진행중인 mainChallenge(boolean: false) 조회
export const mainChallengeCheck = async () => {
  let { data, error } = await supabase.from('mainChallenge').select(`*`).eq('isCompleted', false);
  const challenge = data?.[0] || null;

  if (error) {
    throw error;
  }
  return challenge;
};

