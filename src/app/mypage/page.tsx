'use client';
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
// import Image from 'next/image';

import { Button, Input } from '@/components/common';
import TreeGuideModal from '@/components/common/mypage/TreeGuideModal';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
// import profileDefaultImg from '../../assets/profileDefaultImg.png';

import type { User } from '@/types/db.type';
import type { Props } from '@/types/Props.type';

export default function Page({ params: { slug } }: Props) {
  const session = useSessionStore((state: { session: any }) => state.session);

  // useQuery를 사용하여 사용자 프로필 가져오기
  const { data: userProfile } = useQuery(['userProfile', session?.user.id], async () => {
    const response = await supabase.from('users').select('*').eq('user_id', session?.user.id);
    return response.data?.[0];
  });

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<User | null>(null);

  const [showRankGuide, setShowRankGuide] = useState(false);

  console.log('★userProfile', userProfile?.nickname);

  // Edit user profile
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  // useMutation을 사용하여 사용자 프로필 업데이트
  const editProfileMutation = useMutation(['editProfile', session?.user.id], async (updatedProfile: UserProfile) => {
    return supabase.from('users').update(updatedProfile).eq('user_id', session?.user.id);
  });

  console.log('editProfileMutation', editProfileMutation);

  const handleSaveClick = async () => {
    if (!editedProfile) {
      return;
    }
    try {
      await editProfileMutation.mutateAsync(editedProfile); // editedProfile을 전달하여 업데이트 작업 수행
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

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

  const { mainOpenModal, isOpenMainModal } = useModalStore(state => state);

  const onClickTreeGuide = () => {
    mainOpenModal();
  };

  return (
    <>
      {slug}
      <div className="flex justify-evenly">
        <div>
          <h3>마이페이지</h3>
          <div className="p-10 bg-white drop-shadow-md">
            {/* 유저프로필 */}
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
                {/* <Image src={userProfile?.profile_img ? `${userProfile?.profile_img}` : profileDefaultImg} alt="profileDefaultImg" width={100} height={100} className="rounded-full inline-block mb-4" /> */}
                {/* 기능 추가 필요 */}
                <Button btnType={'borderBlack'} size={'xsmall'}>
                  이미지 수정
                </Button>
                <p>
                  <Input type="text" value={editedProfile.nickname || ''} onChange={e => setEditedProfile(prev => ({ ...prev, nickname: e.target.value }))} _size={''} />
                </p>
                <p>
                  <Input type="text" value={editedProfile.address || ''} onChange={e => setEditedProfile(prev => ({ ...prev, address: e.target.value }))} _size={''} />
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
                {/* <Image src={userProfile?.profile_img ? `${userProfile?.profile_img}` : profileDefaultImg} alt="profileDefaultImg" width={100} height={100} className="rounded-full inline-block mb-4" /> */}
                <div className="flex">
                  <p>{userProfile?.nickname}</p>
                </div>
                <p>{userProfile?.address}</p>
                <Button btnType={'borderBlack'} size={'small'} onClick={handleEditClick}>
                  프로필 수정
                </Button>
              </>
            )}
            {/* 뱃지 */}
            <div>
              <h3>획득한 뱃지</h3>
              <div>---------------뱃지영역---------------</div>
            </div>
            {/* 나무충전 */}
            <div>
              <p className="flex">현재 나무 총 {userProfile?.point} 그루</p>
              <div>
                <Button onClick={onClickTreeGuide} btnType={'green'} size={'large'} buttonStyle={'rounded-full'}>
                  나무를 얻으려면?
                </Button>
                {isOpenMainModal && <TreeGuideModal />}
              </div>
            </div>
          </div>
        </div>

        {/* 참여중인 챌린지 */}
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
      </div>
    </>
  );
}

// type UserProfile = {
//   rank: number;
//   address: string | null;
//   email: string;
//   nickname: string;
//   point: number;
//   profile_img: string | null;
// };
