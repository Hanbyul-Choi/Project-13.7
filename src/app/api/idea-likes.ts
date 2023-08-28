import { supabase } from '../../../supabase/supabaseConfig';

import type { Likes } from '@/types/db.type';

export const getLikes = async (): Promise<Likes[]> => {
  const { data, error } = await supabase.from('likes').select(`*`);
  if (error) {
    throw error;
  }
  return data;
};

export const clickLike = async (users: string[], postId: string, type: 'update' | 'insert') => {
  if (type === 'update') {
    const { error } = await supabase.from('likes').update({ users }).eq('post_id', postId).select();
    if (error) {
      console.log(error);
    }
  } else {
    await supabase.from('likes').insert({ post_id: postId, users });
  }
};
