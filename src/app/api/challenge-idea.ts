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

export const getIdeaInfinite = async (pageParam = 7, order = 'created_at') => {
  const { count } = await supabase.from('challengeSuggestion').select('*', { count: 'exact', head: true });
  console.log(count);
  const { data, error } = await supabase
    .from('challengeSuggestion')
    .select(`*, users(*), likes(*)`)
    .range(pageParam - 7, pageParam)
    .order(order, { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};
