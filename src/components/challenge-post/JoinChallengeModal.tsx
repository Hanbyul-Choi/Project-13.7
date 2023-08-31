import React, { useEffect, useState } from 'react';

import { loadMainChallenge } from '@/app/api/challenge-certify';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input, Label, useDialog } from '../common';
import Modal from '../common/Modal';

export default function JoinChallengeModal() {
  const session = useSessionStore((state: { session: any }) => state.session);
  const [mainChallenge, setMainChallenge] = useState('');
  const [currentPoint, setCurrentPoint] = useState(null);
  const [userData, setUserData] = useState<UpdateUserData>({
    address: '',
    email: '',
    nickname: '',
    point: 0,
    rank: 0,
    phone: '',
  });

  // const [updateUserData, setUpdateUserData] = useState<UpdateUserData>({
  //   address: '',
  //   email: '',
  //   nickname: '',
  //   point: 0,
  //   rank: 0,
  //   phone: '',
  // });

  const { Alert } = useDialog();
  const { mainCloseModal } = useModalStore(state => state);

  // 기존 포인트 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: previousData, error } = await supabase.from('users').select('*').eq('user_id', session?.user.id).single();
        if (error) {
          console.error('Error fetching previous data', error);
        } else if (previousData) {
          const fetchedPoint = previousData.point;
          const fetchedUserData = previousData;
          setCurrentPoint(fetchedPoint);
          setUserData(fetchedUserData);

          console.log('user data', fetchedUserData);
        }
      } catch (error) {
        console.error('Data Fetching Error', error);
      }
    };

    fetchData();
  }, [session]);

  const onClickJoinChallenge = async () => {
    if (!session?.user) {
      Alert('챌린지에 참여하려면 로그인이 필요합니다.');
      mainCloseModal();
      return;
    }

    try {
      const updatedPoint = currentPoint - 10;

      console.log('사용자 포인트 업데이트 중...');
      const { data: updateData, error: updateError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session?.user.id);
      if (updateError) {
        console.error('데이터 업데이트 오류:', updateError);
        return;
      }

      console.log('joinChallenge 항목 생성 중...');
      await supabase.from('joinChallenge').insert({ user_id: session?.user.id, challenge_id: mainChallenge.challenge_Id });

      console.log('사용자 데이터 업데이트 중...');
      const { data: userDataUpdateData, error: userDataUpdateError } = await supabase.from('users').update(userData).eq('user_id', session?.user.id);
      if (userDataUpdateError) {
        console.error('사용자 데이터 업데이트 오류:', userDataUpdateError);
        return;
      }

      console.log('데이터가 성공적으로 업데이트되었습니다:', updateData);
      console.log('사용자 데이터가 성공적으로 업데이트되었습니다:', userDataUpdateData);

      Alert('챌린지 참여신청이 완료되었습니다! 참여 인증페이지에서 활동을 인증하고 지구 온도를 지켜주세요!');
      mainCloseModal();
    } catch (error) {
      console.error('데이터 전송 오류', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const challengeData = await loadMainChallenge();
      setMainChallenge(challengeData);
    };

    fetchData();
  }, []);

  const handleCancelClick = () => {
    mainCloseModal();
  };
  return (
    <Modal>
      <form>
        <Label name={'주문자정보'} size={'base'}>
          주문자정보
        </Label>
        <Input value={userData.nickname || ''} onChange={e => setUserData(prev => ({ ...prev, nickname: e.target.value }))} _size={'sm'} placeholder="이름" />
        <Input value={userData.phone || ''} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} _size={'sm'} placeholder="연락처" />
        <Input value={userData.email || ''} onChange={e => setUserData(prev => ({ ...prev, email: e.target.value }))} _size={'sm'} placeholder="이메일" />
        <Label name={'배송정보'} size={'base'}>
          배송정보
        </Label>
        <Input type="text" value={userData.address || ''} onChange={e => setUserData(prev => ({ ...prev, address: e.target.value }))} _size={'sm'} placeholder="굿즈를 배송받으실 주소를 입력해주세요" />
        {/* <Input _size={'sm'} placeholder="주소" />
        <Input  _size={'sm'} placeholder="상세주소" />
        <Input _size={'sm'} placeholder="우편번호" /> */}
        <Label name={'배송메세지'} size={'base'}>
          배송메세지
        </Label>
        <p>배송 메세지를 선택해주세요. ▼드롭다운▼</p>
        <Label name={'결제 방식'} size={'base'}>
          결제 방식 : 포인트 결제
        </Label>
        <p>보유중인 나무: {currentPoint}</p>
        <div className="flex gap-2 justify-center mt-4">
          <Button type="submit" onClick={onClickJoinChallenge} btnType={'primary'}>
            참여 신청하기
          </Button>
          <Button btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
            취소
          </Button>
        </div>
      </form>
    </Modal>
  );
}

type UpdateUserData = {
  rank: number;
  address: string | null;
  email: string;
  nickname: string;
  point: number;
  phone: string | null;
};
