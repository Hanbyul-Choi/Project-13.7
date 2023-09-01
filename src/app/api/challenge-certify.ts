import { supabase } from '../../../supabase/supabaseConfig';

import type { CertifyPostType } from '@/types/db.type';




//  챌린지 인증 게시글(reviews) 조회
export const loadChallengeReviews = async () => {
  let { data, error } = await supabase.from('reviews').select(`*, mainChallenge(title), users(*)`);

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

export const postCertify = async (certifyData: CertifyPostType) => {
  const { error } = await supabase.from('reviews').insert(certifyData)
  if (error) {
  throw error
  }

}

// await supabase.from('reviews').insert({
//   user_id: session?.user.id,
//   insta_url: instaUrl,
//   challenge_id: mainChallenge.challenge_Id,
//   img_url: res.imageUrl,
//   tags: res.hashtags
// });

