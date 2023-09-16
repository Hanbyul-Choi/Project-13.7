import { supabase } from '../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

export const getUserProfile = async (user_id: string) => {
  const response = await supabase
    .from('users')
    .select('*')
    .eq('user_id', user_id ?? '');
  return response.data?.[0];
};

export const postUserProfileImg = async ({ imgName, imgFile }: { imgName: string; imgFile: File }) => {
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

export const getTotalNumberDonation = async () => {
  const { data } = await supabase.from('donation').select('point').eq('isCompleted', false);
  if (data && data.length > 0 && 'point' in data[0]) {
    const pointValue = data[0].point;
    return Number(pointValue);
  }
  return 0;
};
export const updateTotalNumberDonation = async (updatedPoint: number) => {
  const { error } = await supabase.from('donation').update({ point: updatedPoint }).eq('isCompleted', false);
  if (error) {
    throw error;
  }
};

export const postDonationHistory = async (donationData: any) => {
  const { data, error } = await supabase.from('donationHistory').insert(donationData);
  if (error) {
    throw error;
  }

  console.log('기부 내역이 성공적으로 등록되었습니다.', data);
  return data;
};

export const udpateUserPoint = async (updatedPoint: number, userId: string) => {
  const { error } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', userId);
  if (error) {
    throw error;
  }
};

export const getTotalNumberDonation = async () => {
  const { data } = await supabase.from('donation').select('point').eq('isCompleted', false);
  if (data && data.length > 0 && 'point' in data[0]) {
    const pointValue = data[0].point;
    return Number(pointValue);
  }
  return 0;
};
export const updateTotalNumberDonation = async (updatedPoint: number) => {
  const { error } = await supabase.from('donation').update({ point: updatedPoint }).eq('isCompleted', false);
  if (error) {
    throw error;
  }
};

export const postDonationHistory = async (donationData: any) => {
  const { data, error } = await supabase.from('donationHistory').insert(donationData);
  if (error) {
    throw error;
  }

  console.log('기부 내역이 성공적으로 등록되었습니다.', data);
  return data;
};

export const udpateUserPoint = async (updatedPoint: number, userId: string) => {
  const { error } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', userId);
  if (error) {
    throw error;
  }
};

export const getCurUserChallenges = async (user_id: string | undefined) => {
  if (!user_id) {
    return null;
  }
  const { data } = await supabase
    .from('joinChallenge')
    .select(`*, mainChallenge (*)`)
    .eq('user_id', user_id ?? '');
  return data;
};

export const getCompletedChallenges = async (user_id: string | undefined) => {
  if (!user_id) {
    return null;
  }
  const { data } = await supabase
    .from('joinChallenge')
    .select(`*, mainChallenge (*)`)
    .eq('user_id', user_id ?? '')
    .eq('completedMission', true);
  return data;
};

export const getCurUserReviews = async (user_id: string | undefined) => {
  if (!user_id) {
    return null;
  }
  const { data } = await supabase
    .from('reviews')
    .select(`*, mainChallenge (title)`)
    .eq('user_id', user_id ?? '');
  return data;
};

export const getUserChallengeSuggestions = async (user_id: string | undefined) => {
  if (!user_id) {
    return null;
  }
  const { data } = await supabase
    .from('challengeSuggestion')
    .select(`*`)
    .eq('user_id', user_id ?? '');
  return data;
};
