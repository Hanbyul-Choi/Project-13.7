import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCurUserChallenges, getCurUserReviews } from '@/app/api/mypage';
import { USER_CHALLENGES, USER_REVIEWS } from '@/app/shared/queries.keys';
import useSessionStore from '@/store/sesson.store';

import JoinedChallengeList from './JoinedChallengeList';
import ReveiwList from './ReviewList';

export default function UserChallengeList() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const { data: userChallenges } = useQuery({ queryKey: [USER_CHALLENGES], queryFn: () => getCurUserChallenges(session?.user_id) });
  const { data: userReviews } = useQuery({ queryKey: [USER_REVIEWS], queryFn: () => getCurUserReviews(session?.user_id) });

  const handleJoinChallengeClick = () => {
    setIsJoinedChallengeOpen(true);
    setIsMyChallengeOpen(false);
  };

  const handleMyChallengeClick = () => {
    setIsJoinedChallengeOpen(false);
    setIsMyChallengeOpen(true);
  };

  return (
    <>
      <div className="p-10 bg-white w-2/3">
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
            <ul className="flex text-base opacity-50 px-6 py-3 mb-2">
              <li className="flex-none w-80">챌린지</li>
              <li className="flex-none w-40">기간</li>
              <li className="flex-none w-40">진행상황</li>
            </ul>
            {userChallenges?.length || 0 > 0 ? (
              <>
                {userChallenges?.map(item => (
                  <JoinedChallengeList key={item.join_id} item={item} /> // Use ChallengeItem component
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
              <li>챌린지</li>
              <li>인증 날짜</li>
              <li>바로가기</li>
            </ul>
            {userReviews?.length || 0 > 0 ? (
              <>
                {userReviews?.map(item => (
                  <ReveiwList key={item.post_id} item={item} /> // Use ReviewItem component
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
