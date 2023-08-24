'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Button from '@/components/common/Button';
import useSessionStore from '@/store';
import { useModalStore } from '@/store/modalStore';

import TreeGuideModal from './TreeGuideModal';
import { supabase } from '../../../supabase/supabaseConfig';
import profileDefaultImg from '../../assets/profileDefaultImg.png';

import type { Props } from '@/types/PropsType';

type UserProfile = {
  address: string | null;
  email: string;
  nickname: string;
  point: number;
  profile_img: string | null;
};

type UserChallenges = {
  mainChallenge: any;
  id: string;
  title: string;
  startDate: number;
  endDate: number;
  isCompleted: boolean;
};

type UserReviews = {
  mainChallenge: any;
  id: string;
  created_at: number;
  insta_url: string;
};

export default function Page({ params: { slug } }: Props) {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    profile_img: '',
  });

  const [userChallenges, setUserChallenges] = useState<UserChallenges[]>([]);
  const [userReviews, setUserReviews] = useState<UserReviews[]>([]);

  const session = useSessionStore((state: { session: any }) => state.session);

  // user profile
  const loadUserInfo = async () => {
    let { data: users } = await supabase.from('users').select('*').eq('user_id', session?.user.id);
    console.log('Users:', users);

    if (users && users.length > 0) {
      const user = users[0];
      setUserProfile({
        address: user.address,
        email: user.email,
        nickname: user.nickname,
        point: user.point,
        profile_img: user.profile_img,
      });
    }
  };

  // user가 신청하고 참여한 main challenge
  const loadUserChallenges = async () => {
    let { data: challenges } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`);
    console.log('Challenges:', challenges);

    if (challenges) {
      setUserChallenges(challenges);
    }
  };

  // user의 챌린지 인증 게시글 불러오기
  const loadUserReviews = async () => {
    let { data: reviews } = await supabase.from('reviews').select(`*, mainChallenge (title)`).eq('user_id', session?.user.id);
    console.log('Reviews:', reviews);

    if (reviews) {
      setUserReviews(reviews);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadUserInfo();
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserChallenges();
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserReviews();
    };

    fetchData();
  }, [session]);

  const { openModal } = useModalStore(state => state);

  const onClickTreeGuide = () => {
    openModal(); // 모달 열기
  };

  return (
    <div>
      {/* 유저프로필 */}
      <div>
        {slug}
        <h1>My Page</h1>
        <Image src={userProfile?.profile_img ? `${userProfile.profile_img}` : profileDefaultImg} alt="profileDefaultImg" className="w-[100px] h-[100px] rounded-full inline-block mb-4" />
        <Button btnType={'black'} size={'small'}>
          내정보 수정하기
        </Button>
        <p>Nickname: {userProfile.nickname}</p>
        <p>Email: {userProfile.email}</p>
      </div>
      <h1>내 뱃지</h1>
      <div>---------------뱃지영역---------------</div>

      {/* 나무충전 */}
      <div>
        <h1>현재 나무 총{userProfile.point}그루</h1>
        <div>
          <Button onClick={onClickTreeGuide} btnType={'green'} size={'large'}>
            나무 충전하기
          </Button>
          <TreeGuideModal />
        </div>
      </div>

      {/* 참여중인 챌린지 */}
      <h1>내 챌린지</h1>
      {userChallenges?.map((item, index) => (
        <div key={item.id}>
          <div>{index + 1}</div>
          <div>제목: {item.mainChallenge.title}</div>
          <div>시작일: {item.mainChallenge.startDate}</div>
          <div>종료일: {item.mainChallenge.endDate}</div>
        </div>
      ))}

      {/* 챌린지 인증 게시글 리스트 */}
      <h1>내 챌린지 인증</h1>
      <div>
        {userReviews?.map((item, index) => (
          <div key={item.id}>
            <div>{index + 1}</div>
            <div>제목: {item.mainChallenge.title}</div>
            <div>시작일: {item.insta_url}</div>
            <div>종료일: {item.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
