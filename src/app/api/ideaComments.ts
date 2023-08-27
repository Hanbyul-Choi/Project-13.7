import { supabase } from '../../../supabase/supabaseConfig';
type TcommentData = {
  post_id: string;
  user_id: string;
  comment: string;
};

export const postChallengeIdeaComment = async (commentData: TcommentData) => {
  const response = await supabase.from('ideaComments').insert(commentData);
  console.error(response.error);
  return response.data;
};
