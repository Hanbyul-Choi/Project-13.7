import { supabase } from '../../../supabase/supabaseConfig';

export const postChallengeIdeaComment = async (commentData: any) => {
  const { data, error } = await supabase.from('ideaComments').insert(commentData);
  if (error) {
    throw error;
  }
  return data;
};

export const updateUserPoint = async (updatedPoint: number, userId: string) => {
  const { data, error } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', userId);
  if (error) {
    throw error;
  }
  return data;
};

export const updateChallengeIdeaComment = async ({ id, editComment }: { id: string; editComment: string }) => {
  const { error } = await supabase.from('ideaComments').update({ comment: editComment }).eq('id', id);
  if (error) {
    throw error;
  }
};

export const deleteChallengeIdeaComment = async (id: string) => {
  const { error } = await supabase.from('ideaComments').delete().eq('id', id);
  if (error) {
    throw error;
  }
};

export const getIdeaCommentInfinite = async ({ queryKey, pageParam = 1 }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, slug] = queryKey;

  const { count } = await supabase.from('ideaComments').select('*', { count: 'exact', head: true }).eq('post_id', `${slug}`);

  const pageToFetch = pageParam * 4 + (pageParam - 1);

  const { data, error } = await supabase
    .from('ideaComments')
    .select(`*, users(*)`)
    .eq('post_id', `${slug}`)
    .range(pageToFetch - 4, pageToFetch)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }
  return { data, total_pages: Math.ceil((count ?? 0) / 5), page: pageParam };
};
