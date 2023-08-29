import { supabase } from '../../../supabase/supabaseConfig';

//  챌린지 인증 게시글(reviews) 조회
export const loadChallengeReviews = async () => {
  let { data, error } = await supabase.from('reviews').select(`*, mainChallenge (title)`);

  if (error) {
    throw error;
  }
  return data;
};

// 진행중인 mainChallenge(boolean: false) 조회
export const loadMainChallenge = async () => {
  let { data, error } = await supabase.from('mainChallenge').select(`*`).eq('isCompleted', false);
  const challenge = data?.[0] || null;

  if (error) {
    throw error;
  }
  return challenge;
};
