import { supabase } from '../../../supabase/supabaseConfig';

export const getLoginUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return data;
};
