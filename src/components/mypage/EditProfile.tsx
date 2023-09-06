import React, { useState } from 'react';

import { updateUserProfile } from '@/app/api/mypage';
import { Button, Input } from '@/components/common';
import useSessionStore from '@/store/sesson.store';

import { ImageUpload } from './ImageUpload';

import type { User } from '@/types/db.type';

interface EditProfileProps {
  setEditMode: (mode: boolean) => void;
  userProfile?: User;
  setUserProfile: (userProfile: User | null) => void;
}

export default function EditProfile({ setEditMode, userProfile, setUserProfile }: EditProfileProps) {
  const [editedProfile, setEditedProfile] = useState({
    nickname: userProfile?.nickname || '',
    address: userProfile?.address || '',
    profile_img: userProfile?.profile_img || '',
    user_id: userProfile?.user_id || '',
    created_at: userProfile?.created_at || '',
    point: userProfile?.point || 0,
    email: userProfile?.email || '',
    rank: userProfile?.rank || 0,
  });

  const session = useSessionStore((state: { session: any }) => state.session);

  const handleSaveClick = async () => {
    try {
      if (!editedProfile) {
        return;
      }

      console.log('userProfile.profile_img', userProfile);
      console.log('editedProfile.profile_img', editedProfile); //이미지 url만 안들어가는 중

      await updateUserProfile({ userData: editedProfile, getParamUserSession: session?.user_id });
      setEditMode(false);
      setUserProfile(editedProfile);
    } catch (error) {
      console.error('사용자 프로필 업데이트 오류:', error);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  return (
    <>
      <div className="text-center mb-8">
        <ImageUpload
          onSuccess={(imageUrl: string) => {
            setEditedProfile((prev: any) => ({ ...prev, profile_img: imageUrl }));
          }}
        />
        <div className="space-y-1 flex flex-col">
          <Input type="text" value={editedProfile?.nickname || ''} onChange={e => setEditedProfile((prev: any) => ({ ...prev, nickname: e.target.value }))} placeholder="이름" _size={'sm'} />
          <Input type="text" value={editedProfile?.address || ''} onChange={e => setEditedProfile((prev: any) => ({ ...prev, address: e.target.value }))} placeholder="주소" _size={'sm'} />
        </div>
        <div className="flex gap-2 justify-center mx-auto my-2">
          <Button btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
            수정 취소
          </Button>
          <Button btnType={'black'} size={'small'} onClick={handleSaveClick}>
            저장하기
          </Button>
        </div>
      </div>
    </>
  );
}
