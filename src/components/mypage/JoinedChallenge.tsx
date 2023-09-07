import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { getCurUserChallenges, getCurUserReviews } from '@/app/api/mypage';
import { USER_CHALLENGES, USER_REVIEWS } from '@/app/shared/queries.keys';
import useSessionStore from '@/store/sesson.store';

export default function JoinedChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [isJoinedChallengeOpen, setIsJoinedChallengeOpen] = useState(true);
  const [isMyChallengeOpen, setIsMyChallengeOpen] = useState(false);

  const handleJoinChallengeClick = () => {
    setIsJoinedChallengeOpen(true);
    setIsMyChallengeOpen(false);
  };

  const handleMyChallengeClick = () => {
    setIsJoinedChallengeOpen(false);
    setIsMyChallengeOpen(true);
  };

  const { data: userChallenges } = useQuery({ queryKey: [USER_CHALLENGES], queryFn: () => getCurUserChallenges(session?.user_id) });
  const { data: userReviews } = useQuery({ queryKey: [USER_REVIEWS], queryFn: () => getCurUserReviews(session?.user_id) });

  return (
    <>
      <div className="p-10 w-2/3">
        <div className="flex">
          <div className={`text-lg font-semibold px-3 py-2 mb-6 mx-2 cursor-pointer ${isJoinedChallengeOpen ? 'border-b-4 border-blue' : 'text-sub6'}`} onClick={handleJoinChallengeClick}>
            참여 챌린지
          </div>
          <div className={`text-lg font-semibold px-3 py-2 mb-6 mx-2 cursor-pointer ${isMyChallengeOpen ? 'border-b-4 border-blue' : 'text-sub6'}`} onClick={handleMyChallengeClick}>
            나의 챌린지 인증
          </div>
        </div>
        {isJoinedChallengeOpen && (
          <div>
            <ul className="flex justify-between items-center text-base opacity-50 px-6 py-3 mb-2">
              <li className="relative w-2/4">챌린지</li>
              <li className="relative w-1/4 text-center">참여기간</li>
              <li className="relative w-1/5 text-center">진행상황</li>
            </ul>
            {userChallenges?.length || 0 > 0 ? (
              <>
                {userChallenges?.map(item => (
                  <ul key={item.join_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-8 py-4 mb-4">
                    <li className="relative w-2/4 text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">{item.mainChallenge?.title}</li>
                    <li className="relative w-1/3 text-base opacity-50 text-center">
                      {item.mainChallenge?.startDate} - {item.mainChallenge?.endDate}
                    </li>
                    <div className={`relative w-1/6 py-1 text-center rounded ${item.mainChallenge?.isCompleted ? 'bg-lightblue text-blue' : 'bg-lightgreen text-green'}`}>{item.mainChallenge?.isCompleted ? '완료' : '진행중'}</div>
                  </ul>
                ))}
              </>
            ) : (
              <>
                <div className="text-center p-10">
                  <p>참여한 챌린지가 없습니다. 챌린지에 참여해주세요!</p>
                </div>
              </>
            )}
          </div>
        )}

        {isMyChallengeOpen && (
          <div>
            <ul className="flex justify-between text-base opacity-50 px-6 py-3 mb-2">
              <li className="relative w-2/4">챌린지</li>
              <li className="relative w-1/4 text-center">인증날짜</li>
              <li className="relative w-1/4 text-center">바로가기</li>
            </ul>
            {userReviews?.length || 0 > 0 ? (
              <>
                {userReviews?.map(item => (
                  <ul key={item.post_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-8 py-4 mb-4">
                    <li className="relative w-2/4 text-lg overflow-hidden overflow-ellipsis whitespace-nowrap">{item.mainChallenge?.title}</li>
                    <li className="relative w-1/4 text-base opacity-50 text-center mr-6">{item.created_at ? item.created_at.slice(0, 10) : ''}</li>
                    <div className="relative w-1/5 mr-2 bg-opacityblack py-1 text-center rounded text-base text-sub8">
                      <Link href={item?.insta_url}>바로가기</Link>
                    </div>
                  </ul>
                ))}
              </>
            ) : (
              <>
                <div className="text-center p-10">
                  <p>인증한 챌린지가 없습니다. 챌린지 인증에 참여해주세요!</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
