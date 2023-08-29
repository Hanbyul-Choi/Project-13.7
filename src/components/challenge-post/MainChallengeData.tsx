import React, { useEffect, useState } from 'react';

import { loadMainChallenge } from '@/app/api/challenge-certify';

export default function MainChallengeData() {
  const [mainChallenge, setMainChallenge] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>MainChallengeData</div>
      <h1>{mainChallenge.title}</h1>
    </>
  );
}
