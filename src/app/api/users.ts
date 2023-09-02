import { supabase } from '../../../supabase/supabaseConfig';

export const getUsers = async () => {
  const { data } = await supabase.from('users').select(`*`).range(0, 4).order('rank', { ascending: false });
  return data;
};

export const getUser = async (user_id: string) => {
  const { data } = await supabase.from('users').select('*').eq('user_id', user_id).single();
  return data;
};
