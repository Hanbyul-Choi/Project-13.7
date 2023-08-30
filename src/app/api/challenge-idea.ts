import { supabase } from '../../../supabase/supabaseConfig';

import type { TIdeaData } from '../idea/post/page';

// ChallengeSuggestion datat와 해당유저 데이터 get
export const getSuggestions = async () => {
  const { data, error } = await supabase.from('challengeSuggestion').select(`*, users(*), likes(*)`);
  if (error) {
    throw error;
  }
  return data;
};

export const postChallengeIdea = async (ideaData: TIdeaData) => {
  const response = await supabase.from('challengeSuggestion').insert(ideaData);
  return response.data;
};

export const getIdeaInfinite = async ({ queryKey, pageParam = 1 }: any) => {
  const { count } = await supabase.from('challengeSuggestion').select('*', { count: 'exact', head: true });
  const [_, page] = queryKey;
  const pageToFetch = (page ?? pageParam) * 7;

  const { data, error } = await supabase
    .from('challengeSuggestion')
    .select(`*, users(*), likes(*)`)
    .range(pageToFetch - 7, pageToFetch)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return { result: data, total_pages: (count ?? 0) / 7, page: pageParam };
};
