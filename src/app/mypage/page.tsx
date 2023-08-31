'use client';

import JoinedChallenge from '@/components/mypage/JoinedChallenge';
import UserProfile from '@/components/mypage/UserProfile';

import type { Props } from '@/types/Props.type';

export default function Page({ params: { slug } }: Props) {
  return (
    <>
      {slug}
      <div className="flex justify-evenly">
        <div>
          <h3>마이페이지</h3>
          <UserProfile />
        </div>
        <JoinedChallenge />
      </div>
    </>
  );
}
