import React, { useEffect } from 'react';
import { useState } from 'react';

import Image from 'next/image';
import { AiFillEnvironment } from 'react-icons/ai';
import { BarLoader } from 'react-spinners';

import { getUserProfile } from '@/app/api/mypage';
import useSessionStore from '@/store/sesson.store';

import BadgesList from './BadgesList';
import EditProfile from './EditProfile';
import PointTree from './PointTree';
import RankingGuide from './RankingGuide';

import type { User } from '@/types/db.type';

const profileDefault = 'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/userProfileImg/defaultProfileImage2.png';

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

  const curUserTrees = userProfile?.point ?? 0;
  const userId = session?.user_id;

  const handleEditClick = () => {
    setEditMode(true);
  };

  if (!userProfile) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }

  return (
    <>
      {editMode ? (
        <EditProfile setEditMode={setEditMode} userProfile={userProfile} setUserProfile={setUserProfile} />
      ) : (
        <>
          <div className="text-center m-4">
            <Image
              src={userProfile?.profile_img || profileDefault}
              alt="profileDefaultImg"
              width={100}
              height={100}
              className="w-32 h-32 flex justify-center overflow-hidden object-cover rounded-md mx-auto m-2"
            />
          </div>
          <div className="flex justify-center items-center gap-0.5 p-2">
            <p className="font-semibold text-lg">{userProfile?.nickname}</p>
            <RankingGuide />
          </div>
          <p className="text-sm opacity-50 flex justify-center gap-1 items-center">
            <AiFillEnvironment size={15} /> {userProfile?.address}
          </p>
          <div className="flex justify-center items-center my-3">
            <button
              className="border-sub5 text-sub6 px-4 py-1 gap-2 border rounded-md text-sm mb-2 flex justify-center items-center"
              onClick={handleEditClick}
            >
              프로필 수정
            </button>
          </div>
          <BadgesList />
          <PointTree curUserTrees={curUserTrees} userId={userId} />
        </>
      )}
    </>
  );
}
