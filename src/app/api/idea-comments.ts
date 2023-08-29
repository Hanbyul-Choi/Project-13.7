import { supabase } from '../../../supabase/supabaseConfig';

interface PostComment {
  [key: string]: string;
}
export const postChallengeIdeaComment = async (commentData: PostComment) => {
  const response = await supabase.from('ideaComments').insert(commentData);
  console.error(response.error);
  return response.data;
};
