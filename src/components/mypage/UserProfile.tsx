import React, { useEffect } from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { AiFillEnvironment } from 'react-icons/ai';

import { getUserProfile } from '@/app/api/mypage';
import useSessionStore from '@/store/sesson.store';

import BadgesList from './BadgesList';
import EditProfile from './EditProfile';
import RankingGuide from './RankingGuide';

import type { User } from '@/types/db.type';

const profileDefault = 'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/userProfileImg/userProfileDefault?t=2023-09-04T01%3A41%3A06.168Z';

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
          <div className="text-center m-4 ">
            <Image src={userProfile?.profile_img || profileDefault} alt="profileDefaultImg" width={100} height={100} className="w-32 h-32 flex justify-center overflow-hidden object-cover rounded-md mx-auto m-2" />
          </div>
          <div className="flex justify-center items-center gap-0.5 p-2">
            <p className="font-semibold text-lg">{userProfile?.nickname}</p>
            <RankingGuide />
          </div>
          <p className="text-sm opacity-50 flex justify-center gap-1 items-center">
            <AiFillEnvironment size={15} /> {userProfile?.address}
          </p>
          <div className="flex justify-center items-center my-3">
            <button className="border-sub5 text-sub6 px-4 py-1 gap-2 border rounded-md text-sm mb-2 flex justify-center items-center" onClick={handleEditClick}>
              프로필 수정
            </button>
          </div>
          <BadgesList />
          <div className="text-lg flex justify-center items-baseline gap-1 mt-8">
            <p>현재 나무 총</p>
            <p className="text-xl align-text-bottom font-semibold">{userProfile?.point}</p>
            <p>그루</p>
          </div>
        </>
      )}
    </>
  );
}
