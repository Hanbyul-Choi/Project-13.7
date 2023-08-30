import { supabase } from '../../../supabase/supabaseConfig';

interface PostComment {
  [key: string]: string;
}

export const getChallengeIdeaComment = async (slug: string) => {
  const { data, error } = await supabase.from('ideaComments').select(`*, users(*)`).eq('post_id', `${slug}`);

  if (error) {
    throw error;
  }
  return data;
};

export const postChallengeIdeaComment = async (commentData: PostComment) => {
  const response = await supabase.from('ideaComments').insert(commentData);
  console.error(response.error);
  return response.data;
};
