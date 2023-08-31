import { supabase } from '../../../supabase/supabaseConfig';

interface PostComment {
  [key: string]: string;
}

// 댓글 get
export const getChallengeIdeaComment = async (slug: string) => {
  const { data, error } = await supabase.from('ideaComments').select(`*, users(*)`).eq('post_id', `${slug}`).order('created_at', { ascending: true });

  if (error) {
    throw error;
  }
  return data;
};

// 댓글 post
export const postChallengeIdeaComment = async (commentData: PostComment) => {
  const response = await supabase.from('ideaComments').insert(commentData);
  console.error(response.error);
  return response.data;
};

// 댓글 update
export const updateChallengeIdeaComment = async ({ id, editComment }: { id: string; editComment: string }) => {
  const { error } = await supabase.from('ideaComments').update({ comment: editComment }).eq('id', id);
  if (error) {
    console.error('Error deleting comment:', error);
  }
};

// 댓글 delete
export const deleteChallengeIdeaComment = async (id: string) => {
  const { error } = await supabase.from('ideaComments').delete().eq('id', id);
  if (error) {
    console.error('Error deleting comment:', error);
  }
};
