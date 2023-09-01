import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import TreeGuideModal from './TreeGuideModal';
import { supabase } from '../../../supabase/supabaseConfig';

export default function PointTree() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);
  const onClickTreeGuide = () => {
    mainOpenModal();
  };

  // useQuery를 사용하여 사용자 프로필 가져오기
  const { data: userProfile } = useQuery(['userProfile', session?.user.id], async () => {
    const response = await supabase.from('users').select('*').eq('user_id', session?.user.id);
    return response.data?.[0];
  });

  return (
    <>
      <div className="flex flex-col text-center space-y-2 mt-8">
        <div className="text-lg flex justify-center items-baseline gap-1">
          <p>현재 나무 총</p>
          <p className="text-xl align-text-bottom font-semibold">{userProfile?.point}</p>
          <p>그루</p>
        </div>
        <button onClick={onClickTreeGuide} className="bg-green text-white px-4 py-1 border rounded-full text-sm mb-2">
          나무를 얻으려면?
        </button>
        {isOpenMainModal && <TreeGuideModal />}
      </div>
    </>
  );
}
