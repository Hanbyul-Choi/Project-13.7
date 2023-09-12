import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { getCurUserChallenges, getCurUserReviews, getUserChallengeSuggestions } from '@/app/api/mypage';
import { CHALLENGE_SUGGESTION, USER_CHALLENGES, USER_REVIEWS } from '@/app/shared/queries.keys';
import useSessionStore from '@/store/sesson.store';

export default function JoinedChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [isJoinedChallengeOpen, setIsJoinedChallengeOpen] = useState(false);
  const [isMyChallengeOpen, setIsMyChallengeOpen] = useState(true);
  const [isMySuggestionOpen, setIsMySuggestionOpen] = useState(false);

  const handleJoinChallengeClick = () => {
    setIsJoinedChallengeOpen(true);
    setIsMyChallengeOpen(false);
    setIsMySuggestionOpen(false);
  };

  const handleMyChallengeClick = () => {
    setIsJoinedChallengeOpen(false);
    setIsMyChallengeOpen(true);
    setIsMySuggestionOpen(false);
  };

  const handleMySuggestionClick = () => {
    setIsJoinedChallengeOpen(false);
    setIsMyChallengeOpen(false);
    setIsMySuggestionOpen(true);
  };

  const { data: userChallenges } = useQuery({ queryKey: [USER_CHALLENGES], queryFn: () => getCurUserChallenges(session?.user_id) });
  const { data: userReviews } = useQuery({ queryKey: [USER_REVIEWS], queryFn: () => getCurUserReviews(session?.user_id) });
  const { data: userChallengeSuggestions } = useQuery({
    queryKey: [CHALLENGE_SUGGESTION],
    queryFn: () => getUserChallengeSuggestions(session?.user_id),
  });

  return (
    <>
      <div className="md:p-6 md:mt-3 w-full lg:w-2/3">
        <div className="flex justify-evenly md:justify-start mt-3">
          <div
            className={`text-lg font-semibold px-3 py-2 mb-6 mx-2 cursor-pointer ${isMyChallengeOpen ? 'border-b-4 border-blue' : 'text-sub6'}`}
            onClick={handleMyChallengeClick}
          >
            나의 챌린지 인증
          </div>
          <div
            className={`text-lg font-semibold px-3 py-2 mb-6 mx-2 cursor-pointer ${isJoinedChallengeOpen ? 'border-b-4 border-blue' : 'text-sub6'}`}
            onClick={handleJoinChallengeClick}
          >
            참여 챌린지
          </div>

          <div
            className={`text-lg font-semibold px-3 py-2 mb-6 mx-2 cursor-pointer ${isMySuggestionOpen ? 'border-b-4 border-blue' : 'text-sub6'}`}
            onClick={handleMySuggestionClick}
          >
            내가 제안한 챌린지
          </div>
        </div>

        {isMyChallengeOpen && (
          <div>
            <ul className="flex justify-between items-center text-base opacity-50 px-6 sm:px-4 py-3 mb-2">
              <li className="relative w-2/4 text-left">챌린지</li>
              <li className="relative w-1/4 text-center">인증현황</li>
              <li className="relative w-1/4 text-center">게시글</li>
            </ul>
            {userChallenges?.length || 0 > 0 ? (
              <>
                {userChallenges?.map(item => (
                  <ul key={item.join_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-7 md:px-4 py-4 mb-4">
                    <li className="relative w-2/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">{item.mainChallenge?.title}</li>
                    <li className="relative w-1/4 opacity-50 text-center text-base">{item.reviews}/10</li>
                    <div
                      className={`relative w-1/4 ml-2 text-center rounded text-base md:py-2 ${
                        item.completedMission ? 'sm:bg-lightblue text-blue' : 'sm:bg-lightgreen text-green'
                      }`}
                    >
                      {item.completedMission ? '성공' : '진행중'}
                    </div>
                  </ul>
                ))}

                <div className="relative grid lg:grid-cols-5 gap-2 grid-cols-3">
                  {userReviews?.map((item, index) => (
                    <ul key={item.post_id} className="flex flex-col w-38 h-38 items-left rounded-lg bg-sub1 px-2 py-1">
                      <li className="text-sm">{index + 1}/10</li>
                      <Image
                        src={item.img_url}
                        alt={'인증사진'}
                        width={100}
                        height={100}
                        className="w-full h-full justify-center overflow-hidden object-cover rounded-sm"
                      />
                      <li className="text-sm">인증일 [{item.created_at ? item.created_at.slice(0, 10) : ''}]</li>
                    </ul>
                  ))}
                </div>
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

        {isJoinedChallengeOpen && (
          <div>
            <ul className="flex justify-between items-center text-base opacity-50 px-6 md:px-4 py-3 mb-2 gap-2">
              <li className="relative w-2/4 text-left">챌린지</li>
              <li className="relative w-1/4 text-center">참여기간</li>
              <li className="relative w-1/4 text-center">진행상황</li>
            </ul>
            {userChallenges?.length || 0 > 0 ? (
              <>
                {userChallenges?.map(item => (
                  <ul
                    key={item.join_id}
                    className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-7 md:px-4 py-4 mb-4 gap-2"
                  >
                    <li className="relative w-2/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">{item.mainChallenge?.title}</li>
                    <li className="relative w-1/4 opacity-50 text-center text-base">
                      {item.mainChallenge?.startDate} - {item.mainChallenge?.endDate?.toString().slice(5, 10)}
                    </li>
                    <div
                      className={`relative w-1/4 ml-2 text-center rounded text-base md:py-2 ${
                        item.mainChallenge?.isCompleted ? 'sm:bg-lightblue text-blue' : 'sm:bg-lightgreen text-green'
                      }`}
                    >
                      {item.mainChallenge?.isCompleted ? '완료' : '진행중'}
                    </div>
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

        {isMySuggestionOpen && (
          <div>
            <ul className="flex justify-between items-center text-base opacity-50 px-6 sm:px-4 py-3 mb-2">
              <li className="relative w-2/4 text-left">챌린지</li>
              <li className="relative w-1/4 text-center">날짜</li>
              <li className="relative w-1/4 text-center">게시글</li>
            </ul>
            {userChallengeSuggestions?.length || 0 > 0 ? (
              <>
                {userChallengeSuggestions?.map(item => (
                  <ul key={item.post_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-7 md:px-4 py-4 mb-4">
                    <li className="relative w-2/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">{item?.title}</li>
                    <li className="relative w-1/4 opacity-50 text-center text-base">{item.created_at ? item.created_at.slice(0, 10) : ''}</li>
                    <li className="relative w-1/4 ml-2 text-center rounded sm:bg-opacityblack text-base sm:text-sub8 text-sub6 md:py-3">
                      <Link href={`/idea/${item?.post_id}`}>바로가기</Link>
                    </li>
                  </ul>
                ))}
              </>
            ) : (
              <>
                <div className="text-center p-10">
                  <p>제안한 챌린지가 없습니다. 다음 챌린지를 제안해주세요!</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
