'use client';
import React from 'react';

import JoinChallenge from '@/components/challenge-post/JoinChallenge';
import MainChallengeData from '@/components/challenge-post/MainChallengeData';

export default function ChallengePage() {
  return (
    <>
      <div>challengePage</div>
      <MainChallengeData />
      <JoinChallenge />
    </>
  );
}
