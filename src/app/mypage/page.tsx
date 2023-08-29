'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store.';

import TreeGuideModal from './TreeGuideModal';
import { supabase } from '../../../supabase/supabaseConfig';
import profileDefaultImg from '../../assets/profileDefaultImg.png';

import type { Props } from '@/types/Props.type';

export default function Page({ params: { slug } }: Props) {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    profile_img: '',
    rank: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    profile_img: '',
    rank: 0,
  });

  const [userChallenges, setUserChallenges] = useState<UserChallenges[]>([]);
  const [userReviews, setUserReviews] = useState<UserReviews[]>([]);

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
        rank: user.rank,
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
    let { data: challenges } = await supabase.from('joinChallenge').select(`*, mainChallenge (*)`).eq('user_id', session?.user.id);
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

  // reviews 갯수에 따른 성공여부(completedMission) 업데이트
  const updateUserChallenges = async () => {
    let { data: updatedChallenge } = await supabase.from('joinChallenge').update({ completedMission: true }).eq('user_id', session?.user.id).gte('reviews', 10).select(`*, mainChallenge(*)`);

    const updatedChallenges = userChallenges.map(challenge => {
      if (challenge.reviews >= 10) {
        return { ...challenge, completedMission: true };
      } else {
        return challenge;
      }
    });

    setUserChallenges(updatedChallenges); // 업데이트된 배열을 setUserChallenges를 통해 저장
    console.log('Updated Challenge:', updatedChallenge);
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
      await loadUserChallenges();
    };

    fetchData();
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      await loadUserReviews();
      await updateUserChallenges();
    };

    fetchData();
  }, [session]);

  const { openModal } = useModalStore(state => state);

  const onClickTreeGuide = () => {
    openModal();
  };

  const [showRankGuide, setShowRankGuide] = useState(false);
  return (
    <div>
      {/* 유저프로필 */}
      <div>
        {slug}
        <h1>My Page</h1>
        <div>
          <p onMouseEnter={() => setShowRankGuide(true)} onMouseLeave={() => setShowRankGuide(false)} style={{ cursor: 'pointer' }}>
            등급: {userProfile?.rank}ⓘ
          </p>
          {showRankGuide && (
            <div className="absolute bg-white p-2 border rounded shadow text-center">
              <h3>등급 UP 혜택</h3>
              <div className="flex justify-between gap-4 py-1 mx-2">
                <p>챌린지 1회 달성 시</p>
                <p>물범 수호신 승급</p>
                <p>나무 10그루 지급</p>
              </div>
              <div className="flex justify-between gap-4 py-1 mx-2">
                <p>챌린지 5회 달성 시</p>
                <p>호랑이 수호신 승급</p>
                <p>나무 30그루 지급</p>
              </div>
              <div className="flex justify-between gap-4 py-1 mx-2">
                <p>챌린지 10회 달성 시</p>
                <p>북극곰 마스터 승급</p>
                <p>나무 50그루 지급</p>
              </div>
            </div>
          )}
        </div>
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
            나무를 얻으려면?
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
          <div>참여 인증: {item.reviews}/10</div>
          <div>성공 여부: {item.completedMission.toString()}</div>
          <div>진행 상황: {item.mainChallenge.isCompleted.toString()}</div>
        </div>
      ))}

      {/* 챌린지 인증 게시글 리스트 */}
      <h1>내 챌린지 인증</h1>
      <div>
        {userReviews?.map((item, index) => (
          <div key={item.id}>
            <div>{index + 1}</div>
            <div>제목: {item.mainChallenge.title}</div>
            <div>게시글URL: {item.insta_url}</div>
            <div>생성일: {item.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

type UserProfile = {
  rank: number;
  address: string | null;
  email: string;
  nickname: string;
  point: number;
  profile_img: string | null;
};

type UserChallenges = {
  mainChallenge: any;
  id: string;
  completedMission: boolean;
  reviews: number;
  challengeReviews: UserReviews[];
};

type UserReviews = {
  mainChallenge: any;
  id: string;
  created_at: number;
  insta_url: string;
};
