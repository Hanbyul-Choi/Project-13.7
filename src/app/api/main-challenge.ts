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

export const fetchMainChallenge = async () => {
  const response = await fetch("http://localhost:3000/api/mainChallenge", {
    next: {
      revalidate: 10
    }
  });
  const data = await response.json().then(data=>data.res);
  return data
};