

import { supabase } from '../../../supabase/supabaseConfig';

export const getUsers = async () => {
  const response = await fetch(`${process?.env?.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/users`, {
    next: {
      revalidate: 86400
    }
  });
  const data =await response.json().then(data=>data.res);
  return data
};


export const getUser = async (user_id: string) => {
  const { data } = await supabase.from('users').select('*').eq('user_id', user_id).single();
  return data;
};

export const getUserWithEmail = async (email: string) => {
  const { data } = await supabase.from('users').select('*').eq('email', email).single();
  return data;
};
