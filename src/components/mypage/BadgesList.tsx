import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { getCurUserChallenges } from '@/app/api/mypage';
import useSessionStore from '@/store/sesson.store';

import type { Badge } from '@/types/db.type';

export default function BadgesList() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [userBadges, setUserBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const getUserBadges = async () => {
      const badgeUrl = await getCurUserChallenges(session?.user_id);
      setUserBadges(badgeUrl || []);
    };
    getUserBadges();
    console.log('Get badgeUrl:', userBadges);
  }, [session?.user_id, userBadges]);

  if (!userBadges) {
    return <div>Loading...</div>;
  }
  const completedMissionBadges = userBadges.filter(item => item.completedMission === true);

  return (
    <div className="flex flex-col justify-center my-10">
      <p className="text-black font-semibold text-lg">획득한 뱃지</p>
      <div className="flex flex-wrap justify-start gap-2 pr-2 pt-2 mt-2">
        <Image className="max-w-1/2 max-h-1/2" src={'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/badgeImages/badge1.png?t=2023-09-06T17%3A56%3A48.744Z'} alt={'badge image'} width={100} height={100} />
        {completedMissionBadges?.map(item => (
          <div key={item.join_id}>
            <Image className="max-w-1/2 max-h-1/2" src={item.mainChallenge?.badgeUrl || 'Badge Image'} alt={'badge image'} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
}
