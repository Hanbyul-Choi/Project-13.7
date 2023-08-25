'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';
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
  const session = useSessionStore((state: { session: any }) => state.session);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    profile_img: '',
  });

  const [userChallenges, setUserChallenges] = useState<UserChallenges[]>([]);
  const [userReviews, setUserReviews] = useState<UserReviews[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    profile_img: '',
  });

  // user profile
  const loadUserInfo = async () => {
    try {
      const response = await supabase.from('users').select('*').eq('user_id', session?.user.id);
      const user = response.data[0];

      console.log('User:', user);

      setUserProfile(user);
      setEditedProfile({
        address: user.address,
        email: user.email,
        nickname: user.nickname,
        point: user.point,
        profile_img: user.profile_img,
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Edit user profile
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      await supabase.from('users').update(editedProfile).eq('user_id', session?.user.id);
      setEditMode(false);
      loadUserInfo(); // Update user profile data after save
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
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
    openModal();
  };

  return (
    <div>
      {/* 유저프로필 */}
      <div>
        {slug}
        <h1>My Page</h1>
        {editMode ? (
          <>
            <Image src={userProfile?.profile_img ? `${userProfile.profile_img}` : profileDefaultImg} alt="profileDefaultImg" className="w-[100px] h-[100px] rounded-full inline-block mb-4" />
            {/* 기능 추가 필요 */}
            <Button btnType={'borderBlack'} size={'xsmall'}>
              이미지 수정
            </Button>
            <p>
              닉네임: <Input type="text" value={editedProfile.nickname || ''} onChange={e => setEditedProfile(prev => ({ ...prev, nickname: e.target.value }))} _size={''} />
            </p>
            <p>
              주소: <Input type="text" value={editedProfile.address || ''} onChange={e => setEditedProfile(prev => ({ ...prev, address: e.target.value }))} _size={''} />
            </p>
            <div className="flex gap-2 m-2">
              <Button btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
                수정 취소
              </Button>
              <Button btnType={'black'} size={'small'} onClick={handleSaveClick}>
                저장하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <Image src={userProfile?.profile_img ? `${userProfile.profile_img}` : profileDefaultImg} alt="profileDefaultImg" className="w-[100px] h-[100px] rounded-full inline-block mb-4" />
            <p>닉네임: {userProfile.nickname}</p>
            <p>주소: {userProfile.address}</p>
            <Button btnType={'black'} size={'small'} onClick={handleEditClick}>
              내 정보 수정하기
            </Button>
          </>
        )}
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
