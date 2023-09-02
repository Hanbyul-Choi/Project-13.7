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

export const postCertify = async (certifyData: CertifyPostType) => {
  const { error } = await supabase.from('reviews').insert(certifyData);
  if (error) {
    throw error;
  }
};
