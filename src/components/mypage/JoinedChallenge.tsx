import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';

export default function JoinedChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const router = useRouter();

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

  const { data: userChallenges } = useQuery(['userChallenges', session?.user_id], async () => {
    const { data: challenges } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', session?.user_id);
    return challenges;
  });

  const { data: userReviews } = useQuery(['userReviews', session?.user_id], async () => {
    const { data: reviews } = await supabase.from('reviews').select(`*, mainChallenge (title)`).eq('user_id', session?.user_id);
    return reviews;
  });

  const goToReviews = () => {
    router.push('/challenge/certify');
  };

  return (
    <>
      <div className="p-10 bg-white w-2/3">
        <div className="flex">
          <button className={`text-lg font-semibold px-6 py-3 ${isJoinedChallengeOpen ? '' : 'text-sub6'}`} onClick={handleJoinChallengeClick}>
            참여 챌린지
          </button>
          <button className={`text-lg font-semibold px-6 py-3 ${isMyChallengeOpen ? '' : 'text-sub6'}`} onClick={handleMyChallengeClick}>
            나의 챌린지 인증
          </button>
        </div>
        {isJoinedChallengeOpen && (
          <div>
            <ul className="flex justify-between text-base opacity-50 px-6 py-3 mb-2">
              <li>챌린지 제목</li>
              <li>참여 기간</li>
              <li>진행상황</li>
            </ul>
            {userChallenges?.length || 0 > 0 ? (
              <>
                {userChallenges?.map(item => (
                  <ul key={item.join_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-8 py-4 mb-4">
                    <li className="text-lg overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[200px]">{item.mainChallenge?.title}</li>
                    <li className="text-base opacity-50">
                      {item.mainChallenge?.startDate} - {item.mainChallenge?.endDate}
                    </li>
                    {/* <div className=" w-20 py-1 text-center bg-lightgreen text-green rounded">{item.mainChallenge.isCompleted ? `완료` : `진행중`}</div> */}
                    <div className={`w-20 py-1 text-center rounded ${item.mainChallenge?.isCompleted ? 'bg-lightblue text-blue' : 'bg-lightgreen text-green'}`}>{item.mainChallenge?.isCompleted ? '완료' : '진행중'}</div>
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
              <li>참여 날짜</li>
              <li>챌린지 링크</li>
              <li>진행상황</li>
            </ul>
            {userReviews?.length || 0 > 0 ? (
              <>
                {userReviews?.map(item => (
                  <ul key={item.post_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-6 py-3 mb-3">
                    {/* <li className="text-lg">{item.mainChallenge?.title}</li> */}
                    <li className="text-base opacity-50">{item.created_at ? item.created_at.slice(0, 10) : ''}</li>
                    <li className="text-base opacity-50">{item.insta_url ? item.insta_url.slice(28, 39) : ''}</li>
                    <button onClick={goToReviews} className="bg-opacityblack w-20 py-1 text-center rounded">
                      바로가기
                    </button>
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
