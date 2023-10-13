import { supabase } from '../../../supabase/supabaseConfig';

import type { IdeaPost } from '@/types/db.type';



export const getSuggestions = async () => {
  const { data, error } = await supabase.from('challengeSuggestion').select(`*, users(*)`).order('liked_count', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const postChallengeIdea = async (ideaData: IdeaPost) => {
  const { error } = await supabase.from('challengeSuggestion').insert(ideaData);
  if (error) {
    throw error;
  }
};

export const updateChallengeIdea = async ({ ideaData, postId }: { ideaData: IdeaPost; postId: string }) => {
  const { error } = await supabase.from('challengeSuggestion').update(ideaData).eq('post_id', postId);
  if (error) {
    throw error;
  }
};

export const updateUserPointIdea = async (updatedPoint: number, loginUser: string) => {
  const { data, error } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', loginUser);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteChallengeIdea = async (slug: string) => {
  const { error } = await supabase.from('challengeSuggestion').delete().eq('post_id', `${slug}`);
  if (error) {
    throw error;
  }
};

export const postChallengeIdeaImg = async ({ imgName, imgFile }: { imgName: string; imgFile: File }) => {
  const { error } = await supabase.storage.from('project').upload(`challengeSuggestion/${imgName}`, imgFile, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) {
    throw error;
  }
};

export const getChallengeIdeaImgUrl = async (imgName: string) => {
  const { data } = await supabase.storage.from('project').getPublicUrl(`challengeSuggestion/${imgName}`);
  return data;
};

export const getIdeaInfinite = async ({ queryKey, pageParam = 1 }: any) => {
  const { count } = await supabase.from('challengeSuggestion').select('*', { count: 'exact', head: true });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, sort] = queryKey;
  const pageToFetch = pageParam * 7 + (pageParam - 1);

  let sortedData: any = [];
  if (sort === '최신순') {
    const { data, error } = await supabase
      .from('challengeSuggestion')
      .select(`*, users(*)`)
      .range(pageToFetch - 7, pageToFetch)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    sortedData = [...data];
  } else if (sort === '추천순') {
    const { data, error } = await supabase
      .from('challengeSuggestion')
      .select(`*, users(*)`)
      .range(pageToFetch - 7, pageToFetch)
      .order('liked_count', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }
    sortedData = [...data];
  }
  return { result: sortedData, total_pages: Math.ceil((count ?? 0) / 8), page: pageParam };
};
