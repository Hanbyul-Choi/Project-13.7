import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { BarLoader } from 'react-spinners';

import { getCompletedChallenges } from '@/app/api/mypage';
import useSessionStore from '@/store/session.store';

import type { Badge } from '@/types/db.type';

const defaultProfileImg =
  'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/badgeImages/badge1.png?t=2023-09-06T17%3A56%3A48.744Z';

export default function BadgesList() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [userBadges, setUserBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const getUserBadges = async () => {
      const badgeUrl = await getCompletedChallenges(session?.user_id);
      setUserBadges(badgeUrl || []);
    };
    getUserBadges();
  }, [session?.user_id]);

  if (!userBadges) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center ">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col my-8">
      <p className="text-black font-semibold text-lg mb-4">획득한 뱃지</p>
      <div className="columns-3 gap-5 gap-y-8 ">
        <Image className="w-full mb-6" src={defaultProfileImg} alt={'badge image'} width={100} height={100} />
        {userBadges?.map(item => (
          <div key={item.join_id}>
            <Image className="w-full mb-6" src={item.mainChallenge?.badgeUrl || 'Badge Image'} alt={'badge image'} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
