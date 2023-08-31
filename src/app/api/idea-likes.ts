import { supabase } from '../../../supabase/supabaseConfig';

export const clickLike = async (liked_users: string[], postId: string) => {
  const { error } = await supabase.from('challengeSuggestion').update({ liked_users, liked_count: liked_users.length }).eq('post_id', postId).select();
  if (error) {
    console.log(error);
  }
};
