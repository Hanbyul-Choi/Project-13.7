import { supabase } from '../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

interface TPostImg {
  imgName: string;
  imgFile: File;
}

export const getUserProfile = async (user_id: string | null) => {
  const response = await supabase.from('users').select('*').eq('user_id', user_id);
  return response.data?.[0];
};

export const postUserProfileImg = async ({ imgName, imgFile }: TPostImg) => {
  const { error } = await supabase.storage.from('project').upload(`userProfileImg/${imgName}`, imgFile, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) {
    throw error;
  }
};

export const getImgUrl = async (imgName: string) => {
  const imgUrlResponse = await supabase.storage.from('project').getPublicUrl(`userProfileImg/${imgName}`);
  return imgUrlResponse;
};

export const updateUserProfile = async ({ userData, getParamUserSession }: { userData: User; getParamUserSession: string }) => {
  const { error } = await supabase.from('users').update(userData).eq('user_id', getParamUserSession);
  if (error) {
    throw error;
  }
};

export const getCurUserChallenges = async (user_id: string | null) => {
  const { data } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', user_id);
  return data;
};

export const getCompletedChallenges = async (user_id: string | null) => {
  const { data } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', user_id).eq('completedMission', true);
  return data;
};

export const getCurUserReviews = async (user_id: string | null) => {
  const { data } = await supabase.from('reviews').select(`*, mainChallenge (title)`).eq('user_id', user_id);
  return data;
};
