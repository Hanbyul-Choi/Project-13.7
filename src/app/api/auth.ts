import { supabase } from '../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

export const getLoginUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data;
};

export const getUserDataByToken = async (access_token: string, refresh_token: string) => {
  const { data } = await supabase.auth.setSession({ access_token, refresh_token });
  return data;
};

export const setUserData = async (userData: User) => {
  await supabase.from('users').insert(userData);
};
