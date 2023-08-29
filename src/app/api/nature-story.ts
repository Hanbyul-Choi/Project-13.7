import { supabase } from "../../../supabase/supabaseConfig";

import type { NatureStory } from "@/types/db.type";


export const getNatureStory = async (): Promise<NatureStory[]> => {
  const { data, error } = await supabase.from('natureStory').select(`*`);
  if (error) {
    throw error;
  }
  return data;
};