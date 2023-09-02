'use client';
import { Layout } from '@/components/common';
// import BadgesList from '@/components/mypage/BadgesList';
import JoinedChallenge from '@/components/mypage/JoinedChallenge';
import PointTree from '@/components/mypage/PointTree';
import UserProfile from '@/components/mypage/UserProfile';

import type { Props } from '@/types/props.type';

export default function Page({ params: { slug } }: Props) {
  return (
    <Layout>
      {slug}
      <div className="flex justify-evenly">
        <div>
          <h3 className="mb-4">마이페이지</h3>
          <div className="p-10 bg-white drop-shadow-md">
            <UserProfile />
            {/* <BadgesList /> */}
            <PointTree />
          </div>
        </div>
        <JoinedChallenge />
      </div>
    </Layout>
  );
}
