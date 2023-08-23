'use client';
import React, { useEffect } from 'react';

import { supabase } from '../../../supabase/supabaseConfig';

import type { Props } from '@/types/PropsType';

export default function Page({ params: { slug } }: Props) {
  useEffect(() => {
    const fetchData = async () => {
      await loadUserInfo();
    };

    fetchData();
  }, []);

  const loadUserInfo = async () => {
    let { data: users } = await supabase.from('users').select('*');

    console.log('Users:', users);
  };

  return <div>{slug}testing</div>;
}
