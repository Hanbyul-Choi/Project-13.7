import { supabase } from '../../../supabase/supabaseConfig';

import type { IdeaPost } from '@/types/db.type';

interface TPostImg {
  imgName: string;
  imgFile: File;
}

// ChallengeSuggestion data와 해당유저 데이터 get
export const getSuggestions = async () => {
  const { data, error } = await supabase.from('challengeSuggestion').select(`*, users(*), likes(*)`);
  if (error) {
    throw error;
  }
  return data;
};

// Challenge Idea insert
export const postChallengeIdea = async (ideaData: IdeaPost) => {
  const { error } = await supabase.from('challengeSuggestion').insert(ideaData);
  if (error) {
    throw error;
  }
};

// Challenge Idea update
export const updateChallengeIdea = async ({ ideaData, getParamPostId }: { ideaData: IdeaPost; getParamPostId: string }) => {
  const { error } = await supabase.from('challengeSuggestion').update(ideaData).eq('post_id', getParamPostId);
  if (error) {
    throw error;
  }
};

// Challenge Idea delete
export const deleteChallengeIdea = async (slug: string) => {
  const { error } = await supabase.from('challengeSuggestion').delete().eq('post_id', `${slug}`);
  if (error) {
    throw error;
  }
};

// 첨부된 image storage upload
export const postChallengeIdeaImg = async ({ imgName, imgFile }: TPostImg) => {
  const { error } = await supabase.storage.from('project').upload(`challengeSuggestion/${imgName}`, imgFile, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) {
    throw error;
  }
};

export const getIdeaInfinite = async ({ queryKey, pageParam = 1 }: any) => {
  const { count } = await supabase.from('challengeSuggestion').select('*', { count: 'exact', head: true });
  const [_, page] = queryKey;
  const pageToFetch = (page ?? pageParam) * 7;

  const { data, error } = await supabase
    .from('challengeSuggestion')
    .select(`*, users(*), likes(*)`)
    .range(pageToFetch - 7, pageToFetch)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return { result: data, total_pages: (count ?? 0) / 7, page: pageParam };
};
