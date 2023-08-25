import { supabase } from '../../../supabase/supabaseConfig';

import type { TIdeaData } from '../idea/post/page';

// import type { Suggestion } from "@/types/dataType";

// ChallengeSuggestion datat와 해당유저 데이터 get
export const getSuggestions = async () => {
  let { data, error } = await supabase.from('challengeSuggestion').select(`*, users(*)`);
  if (error) {
    throw error;
  }
  return data;
};

export const postChallengeIdea = async (ideaData: TIdeaData) => {
  const response = await supabase.from('challengeSuggestion').insert(ideaData);
  return response.data;
};
