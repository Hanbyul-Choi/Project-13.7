import React from 'react';

import { useQuery } from '@tanstack/react-query';

import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';

export default function JoinedChallenge() {
  const session = useSessionStore((state: { session: any }) => state.session);
  // useQuery를 사용하여 사용자 챌린지 가져오기
  const { data: userChallenges } = useQuery(['userChallenges', session?.user.id], async () => {
    const { data: challenges } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', session?.user.id);
    return challenges;
  });

  // useQuery를 사용하여 사용자 리뷰 가져오기
  const { data: userReviews } = useQuery(['userReviews', session?.user.id], async () => {
    const { data: reviews } = await supabase.from('reviews').select(`*, mainChallenge (title)`).eq('user_id', session?.user.id);
    return reviews;
  });

  return (
    <div className="p-10 bg-white">
      <h3>참여 챌린지</h3>
      <ul className="flex justify-between">
        <li>챌린지 제목</li>
        <li>참여 기간</li>
        <li>진행상황</li>
      </ul>
      {userChallenges?.map(item => (
        <div className="flex justify-between" key={item.id}>
          <p>{item.mainChallenge.title}</p>
          <p>
            {item.mainChallenge.startDate} - {item.mainChallenge.endDate}
          </p>
          {/* <div>참여 인증: {item.reviews}/10</div> */}
          {/* <div>성공 여부: {item.completedMission.toString()}</div> */}
          <div>진행 상황: {item.mainChallenge.isCompleted.toString()}</div>
        </div>
      ))}

      {/* 챌린지 인증 게시글 리스트 */}
      <h3>나의 챌린지 인증</h3>
      <div>
        {userReviews?.map(item => (
          <div key={item.id}>
            <div>제목: {item.mainChallenge.title}</div>
            <div>게시글URL: {item.insta_url}</div>
            <div>생성일: {item.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
