import React from 'react';

import { useQuery } from '@tanstack/react-query';

import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';

export default function JoinedChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const { data: userChallenges } = useQuery(['userChallenges', session?.user.id], async () => {
    const { data: challenges } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', session?.user.id);
    return challenges;
  });

  const { data: userReviews } = useQuery(['userReviews', session?.user.id], async () => {
    const { data: reviews } = await supabase.from('reviews').select(`*, mainChallenge (title)`).eq('user_id', session?.user.id);
    return reviews;
  });

  return (
    <>
      <div className="p-10 bg-white w-2/3">
        <p className="text-lg font-semibold px-6 py-3">참여 챌린지</p>
        <ul className="flex justify-between text-base opacity-50 px-6 py-3 mb-2">
          <li>챌린지 제목</li>
          <li>참여 기간</li>
          <li>진행상황</li>
        </ul>
        {userChallenges?.map(item => (
          <ul key={item.id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-8 py-4 mb-4">
            <li className="text-lg">{item.mainChallenge.title}</li>
            <li className="text-base opacity-50">
              {item.mainChallenge.startDate} - {item.mainChallenge.endDate}
            </li>
            <div className="bg-lightgreen w-20 py-1 text-center text-green rounded">{item.mainChallenge.isCompleted ? '완료' : '진행중'}</div>
          </ul>
        ))}

        <p className="text-lg font-semibold px-6 py-3 ">나의 챌린지 인증</p>
        <div>
          {userReviews?.map(item => (
            <ul key={item.id} className="flex flex-row justify-between items-center text-lg rounded-lg bg-sub1 px-6 py-3 mb-3">
              <li className="text-lg">{item.mainChallenge?.title}</li>
              {/* <li className="text-base opacity-50">게시글URL: {item.insta_url}</li> */}
              <li className="text-base opacity-50">{item.created_at}</li>
              <div className="bg-opacityblack w-20 py-1 text-center rounded">바로가기</div>
            </ul>
          ))}
        </div>
      </div>
    </>
  );
}
