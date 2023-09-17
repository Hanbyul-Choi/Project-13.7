import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

type ChallengeTabContentProps = {
  activeTab: string;
  userChallenges: any;
  userReviews: any;
  userChallengeSuggestions: any;
  TOTAL_REVIEW_NUMBER: number;
};

const ChallengeTabContent: React.FC<ChallengeTabContentProps> = ({
  activeTab,
  userChallenges,
  userReviews,
  userChallengeSuggestions,
  TOTAL_REVIEW_NUMBER,
}) => {
  if (activeTab === 'myChallenge') {
    return (
      <div>
        <ul className="flex justify-between items-center text-base opacity-50 px-6 sm:px-4 py-3 mb-2">
          <li className="relative w-2/4 text-left">챌린지</li>
          <li className="relative w-1/3 text-center">인증현황</li>
          <li className="relative w-1/3 text-center">상태</li>
        </ul>
        {userChallenges?.length !== 0 ? (
          <>
            {userChallenges?.map((item: any) => (
              <ul key={item.join_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-7 md:px-4 py-4 mb-4">
                <li className="relative w-2/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">{item.mainChallenge?.title}</li>
                <li className="relative w-1/3 opacity-50 text-center text-base">{item.reviews}/10</li>
                <div
                  className={`relative w-1/3 ml-2 text-center rounded text-base md:py-2 ${
                    item.completedMission ? 'sm:bg-lightblue text-blue' : 'sm:bg-lightgreen text-green'
                  }`}
                >
                  {item.completedMission ? '성공' : '진행중'}
                </div>
              </ul>
            ))}
            <div className="z-5 relative grid lg:grid-cols-5 gap-2 grid-cols-3">
              {userReviews?.map((item: any, index: number) => (
                <ul key={item.post_id} className="flex flex-col w-38 h-38 items-left rounded-lg bg-sub1 px-2 py-1">
                  <li className="text-sm">
                    {index + 1}/{TOTAL_REVIEW_NUMBER}
                  </li>
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
    );
  } else if (activeTab === 'joinedChallenge') {
    return (
      <div>
        <ul className="flex justify-between items-center text-base opacity-50 px-6 sm:px-4 py-3 mb-2">
          <li className="relative w-2/4 text-left">챌린지</li>
          <li className="relative w-1/3 text-center">참여기간</li>
          <li className="relative w-1/3 text-center">상태</li>
        </ul>
        {userChallenges?.length !== 0 ? (
          <>
            {userChallenges?.map((item: any) => (
              <ul key={item.join_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-7 md:px-4 py-4 mb-4 gap-2">
                <li className="relative w-2/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">{item.mainChallenge?.title}</li>
                <li className="relative w-1/3 opacity-50 text-center text-base">
                  {item.mainChallenge?.startDate} - {item.mainChallenge?.endDate?.toString().slice(5, 10)}
                </li>
                <div
                  className={`relative w-1/3 text-center rounded text-base md:py-2 ${
                    item.mainChallenge?.isCompleted ? 'sm:bg-lightblue text-blue' : 'sm:bg-lightgreen text-green'
                  }`}
                >
                  {item.mainChallenge?.isCompleted ? '완료' : '진행중'}
                </div>
              </ul>
            ))}
          </>
        ) : (
          <div className="text-center p-10">
            <p>참여한 챌린지가 없습니다. 챌린지에 참여해주세요!</p>
          </div>
        )}
      </div>
    );
  } else if (activeTab === 'mySuggestion') {
    return (
      <div>
        <ul className="flex justify-between items-center text-base opacity-50 px-6 sm:px-4 py-3 mb-2">
          <li className="relative w-2/4 text-left">챌린지</li>
          <li className="relative w-1/3 text-center">제안일</li>
          <li className="relative w-1/3 text-center">바로가기</li>
        </ul>
        {userChallengeSuggestions?.length || 0 > 0 ? (
          <>
            {userChallengeSuggestions?.map((item: any) => (
              <ul key={item.post_id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-7 md:px-4 py-4 mb-4">
                <li className="relative w-2/4 overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">{item?.title}</li>
                <li className="relative w-1/3 opacity-50 text-center text-base">{item.created_at ? item.created_at.slice(0, 10) : ''}</li>
                <Link
                  href={`/idea/${item?.post_id}`}
                  className="relative w-1/3 ml-2 text-center rounded sm:bg-opacityblack text-base sm:text-sub8 text-sub6 md:py-2"
                >
                  <li>바로가기</li>
                </Link>
              </ul>
            ))}
          </>
        ) : (
          <div className="text-center p-10">
            <p>제안한 챌린지가 없습니다. 다음 챌린지를 제안해주세요!</p>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default ChallengeTabContent;
