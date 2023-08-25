import { supabase } from '../../../supabase/supabaseConfig';

import type { TIdeaData } from '../idea/post/page';

const postChallengeIdea = async (ideaData: TIdeaData) => {
  const response = await supabase.from('challengeSuggestion').insert(ideaData);
  return response.data;
};

export { postChallengeIdea };
