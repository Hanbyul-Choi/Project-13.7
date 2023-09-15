import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCurUserChallenges, getCurUserReviews, getUserChallengeSuggestions } from '@/app/api/mypage';
import { CHALLENGE_SUGGESTION, USER_CHALLENGES, USER_REVIEWS } from '@/app/shared/queries.keys';
import useSessionStore from '@/store/sesson.store';

import ChallengeTabContent from './RenderTabContent';
import RenderTabs from './RenderTabs';

export default function JoinedChallenge() {
  const TOTAL_REVIEW_NUMBER = 10;
  const session = useSessionStore((state: { session: any }) => state.session);

  const [activeTab, setActiveTab] = useState('myChallenge');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const { data: userChallenges } = useQuery({ queryKey: [USER_CHALLENGES], queryFn: () => getCurUserChallenges(session?.user_id) });
  const { data: userReviews } = useQuery({ queryKey: [USER_REVIEWS], queryFn: () => getCurUserReviews(session?.user_id) });
  const { data: userChallengeSuggestions } = useQuery({
    queryKey: [CHALLENGE_SUGGESTION],
    queryFn: () => getUserChallengeSuggestions(session?.user_id),
  });

  return (
    <div className="md:p-6 md:mt-3 w-full lg:w-2/3">
      <div className="flex justify-evenly md:justify-start mt-3">
        <RenderTabs tabName="myChallenge" isActive={activeTab === 'myChallenge'} onClick={handleTabClick} tabText="나의 챌린지 인증" />
        <RenderTabs tabName="joinedChallenge" isActive={activeTab === 'joinedChallenge'} onClick={handleTabClick} tabText="참여 챌린지" />
        <RenderTabs tabName="mySuggestion" isActive={activeTab === 'mySuggestion'} onClick={handleTabClick} tabText="내가 제안한 챌린지" />
      </div>
      <ChallengeTabContent
        activeTab={activeTab}
        userChallenges={userChallenges}
        userReviews={userReviews}
        userChallengeSuggestions={userChallengeSuggestions}
        TOTAL_REVIEW_NUMBER={TOTAL_REVIEW_NUMBER}
      />
    </div>
  );
}
