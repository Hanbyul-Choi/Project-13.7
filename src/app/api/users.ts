import { supabase } from '../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

export const getUsers = async (): Promise<User[] | null> => {
  const { data } = await supabase.from('users').select('*').order('rank', { ascending: false }).limit(5);
  return data;
};
