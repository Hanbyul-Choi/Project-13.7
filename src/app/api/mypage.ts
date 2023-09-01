import { supabase } from '../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

interface TPostImg {
  imgName: string;
  imgFile: File;
}

export const postUserProfileImg = async ({ imgName, imgFile }: TPostImg) => {
  const { error } = await supabase.storage.from('project').upload(`userProfileImg/${imgName}`, imgFile, {
    cacheControl: '3600',
    upsert: true,
  });
  if (error) {
    throw error;
  }
};
export const getUserProfile = async (userId: string | null) => {
  const response = await supabase.from('users').select('*').eq('user_id', userId);
  return response.data?.[0];
};

export const getImgUrl = async (imgName: string) => {
  const imgUrlResponse = await supabase.storage.from('project').getPublicUrl(`userProfileImg/${imgName}`);
  return imgUrlResponse;
};

// export const updateImgUrlData = async () => {
//   const { error } = await supabase.from('users').update('profile_img').eq('uer_id', session?.user.id);
//   if (error) {
//     throw error;
//   }
// };

// user data update
export const updateUserData = async ({ userData, getParamUserSession }: { userData: User; getParamUserSession: string }) => {
  const { error } = await supabase.from('users').update(userData).eq('post_id', getParamUserSession);
  if (error) {
    throw error;
  }
};
