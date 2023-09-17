'use client';
import { useEffect } from 'react';

import { useSession } from 'next-auth/react';
import { v4 } from 'uuid';

import { getUserDataByToken, setUserData } from '@/app/api/auth/auth';
import { getUser, getUserWithEmail } from '@/app/api/users';
import useSessionStore from '@/store/session.store';

import { supabase } from '../../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

export default function useLogin() {
  const { session, isLoaded, setSession } = useSessionStore();
  const { data: naverSession, status } = useSession();

  const login = async (access_token: string | null, refresh_token: string | null) => {
    if (access_token && refresh_token) {
      const data = await getUserDataByToken(access_token, refresh_token);
      if (!data) return setSession(null);
      const session = data.session;
      const user_id = session?.user.id!;
      const userData = await getUser(user_id);
      setSession(userData);
    } else {
      if (!isLoaded || status === 'authenticated') {
        if (naverSession) {
          const user_email = naverSession.user.email as string;
          const userData = await getUserWithEmail(user_email);

          if (!userData) {
            const { email, name, image } = naverSession.user;
            const userData: Omit<User, 'created_at'> = {
              user_id: v4(),
              point: 25,
              address: null,
              profile_img: image as string,
              nickname: name as string,
              rank: 0,
              email: email as string,
            };

            await setUserData(userData);
            setSession(userData);
          } else {
            setSession(userData);
          }
        } else {
          supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (!session) {
              return setSession(null);
            } else if (session) {
              localStorage.setItem('access_token', session.access_token);
              localStorage.setItem('refresh_token', session.refresh_token);
            }

            const user_id = session?.user.id;
            const userData = await getUser(user_id);

            if (!userData) {
              const { email, name: nickname, avatar_url: profile_img } = session?.user.user_metadata;
              const userData: Omit<User, 'created_at'> = {
                user_id,
                point: 25,
                address: null,
                profile_img,
                nickname,
                rank: 0,
                email,
              };

              await setUserData(userData);
              setSession(userData);
            } else {
              setSession(userData);
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = window.localStorage.getItem('refresh_token');
    login(access_token, refresh_token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, naverSession]);

  return { isLoaded, session };
}
