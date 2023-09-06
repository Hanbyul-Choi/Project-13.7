import React, { useEffect } from 'react';
import { useState } from 'react';

import { getUserProfile } from '@/app/api/mypage';
import { Button } from '@/components/common';
import useSessionStore from '@/store/sesson.store';

import EditProfile from './EditProfile';
import RankingGuide from './RankingGuide';

import type { User } from '@/types/db.type';

export default function UserProfile() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await getUserProfile(session?.user_id);
      setUserProfile(profile || null);
    };

    fetchUserProfile();
  }, [session?.user_id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {editMode ? (
        <EditProfile setEditMode={setEditMode} userProfile={userProfile} setUserProfile={setUserProfile} />
      ) : (
        <>
          <div className="text-center mb-4 mx-auto">
            <img
              src={userProfile?.profile_img ? `${userProfile?.profile_img}` : 'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/userProfileImg/userProfileDefault?t=2023-09-04T01%3A41%3A06.168Z'}
              alt="profileDefaultImg"
              width={100}
              height={100}
              className="rounded-full inline-block mb-4"
            />
            <div className="flex justify-center items-center gap-1 p-2">
              <p className="font-semibold text-lg">{userProfile?.nickname}</p>
              <RankingGuide />
            </div>
            <p className="text-sm opacity-50">{userProfile?.address}</p>
            <div className="flex justify-center items-center my-3">
              <Button btnType={'borderBlack'} size={'small'} onClick={handleEditClick}>
                프로필 수정
              </Button>
            </div>
            <div className="text-lg flex justify-center items-baseline gap-1 mt-8">
              <p>현재 나무 총</p>
              <p className="text-xl align-text-bottom font-semibold">{userProfile?.point}</p>
              <p>그루</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
