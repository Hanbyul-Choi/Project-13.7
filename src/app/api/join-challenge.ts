import { supabase } from '../../../supabase/supabaseConfig';

import type { UpdateUserData } from '@/components/challenge-post/JoinChallengeModal';
import type { User } from '@/types/db.type';
import type { Tables } from '@/types/supabase.type';

export const userJoinChallengeCheck = async (user_id: string | undefined, challenge_id: string) => {
  const { data } = await supabase
    .from('joinChallenge')
    .select('*')
    .eq('user_id', user_id ?? '')
    .eq('challenge_id', challenge_id)
    .maybeSingle();

  return data;
};

export const updateUserPoint = async (updatedPoint: number, session: User) => {
  const { error } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session.user_id);
  if (error) {
    console.error('데이터 업데이트 오류:', error);
    return;
  }
};

export const insertJoinChallenge = async (session: User, mainChallenge: Tables<'mainChallenge'>, data: UpdateUserData) => {
  const { error } = await supabase
    .from('joinChallenge')
    .insert({ user_id: session.user_id, challenge_id: mainChallenge.challenge_Id, address: data.address, name: data.name, phone: data.phone });
  if (error) {
    throw error;
  }
};

export const defaultAddressCheck = async (userData: UpdateUserData, data: UpdateUserData, updatedPoint: number, session: User) => {
  const { error } = await supabase
    .from('users')
    .update({ ...userData, ...data, point: updatedPoint })
    .eq('user_id', session.user_id);
  if (error) {
    console.error('사용자 데이터 업데이트 오류:', error);
    return;
  }
};
