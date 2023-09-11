import { supabase } from '../../../supabase/supabaseConfig';

import type { CertifyPostType } from '@/types/db.type';

export const postCertify = async (certifyData: CertifyPostType) => {
  const { error } = await supabase.from('reviews').insert(certifyData);
  if (error) {
    throw error;
  }
};

//  챌린지 인증 게시글(reviews) 조회
export const loadChallengeReviewsInfinite = async ({ pageParam = 1 }: any) => {
  const { count } = await supabase.from('reviews').select(`*, mainChallenge(title), users(*)`, { count: 'exact', head: true });
  const pageToFetch = pageParam * 14 + (pageParam - 1);

  const { data, error } = await supabase
    .from('reviews')
    .select(`*, mainChallenge(title), users(*)`)
    .range(pageToFetch - 14, pageToFetch);
  if (error) {
    throw error;
  }
  return { data, total_pages: Math.ceil((count ?? 0) / 15), page: pageParam };
};
