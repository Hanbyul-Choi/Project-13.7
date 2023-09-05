import { supabase } from '../../../supabase/supabaseConfig';

export const userJoinChallengeCheck = async (user_id: string | undefined, challenge_id: string) => {
  const { data } = await supabase.from('joinChallenge').select('*').eq('user_id', user_id).eq('challenge_id', challenge_id).single();

  return data;
};
