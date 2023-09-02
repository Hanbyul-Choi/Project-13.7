import { supabase } from '../../../supabase/supabaseConfig';

export const getNatureStory = async () => {
  const { data, error } = await supabase.from('natureStory').select(`*`);
  if (error) {
    throw error;
  }
  return data;
};
