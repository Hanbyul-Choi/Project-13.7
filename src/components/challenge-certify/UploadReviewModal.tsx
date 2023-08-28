'user client';
import React, { useEffect, useState } from 'react';

import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/sesson.store.';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, Input } from '../common';
import Modal from '../common/Modal';

interface UploadReviewProps {
  modalType: string;
}

const UploadReviewModal: React.FC<UploadReviewProps> = ({ modalType }) => {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [mainChallenge, setMainChallenge] = useState<MainChallenge>([]);
  const [instaUrl, setInstaUrl] = useState('');

  const { isOpen, closeModal } = useModalStore();

  // get 진행중인(boolean: false) mainChallenge data
  const loadMainChallenges = async () => {
    try {
      const response = await supabase.from('mainChallenge').select(`*`).eq('isCompleted', false);
      const challenge = response.data[0];

      console.log('진행중인 챌린지:', challenge);

      setMainChallenge(challenge);
    } catch (error) {
      console.error('Error fetching Challenge data', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadMainChallenges();
    };

    fetchData();
  }, []);

  // reviews table 추가 & joinChallenge reviews 1 추가
  const onClickSaveReview = async () => {
    try {
      await supabase.from('reviews').insert({ user_id: session?.user.id, insta_url: instaUrl, challenge_id: mainChallenge.challenge_Id });

      setInstaUrl('');
    } catch (error) {
      console.error('Error posting review', error);
    }
  };

  return (
    <Modal>
      {isOpen && modalType === 'reviews' && (
        <>
          <h3>{mainChallenge?.title}</h3>
          <div className="text-center">
            <p>주의사항: 타인 도용 및 해당 챌린지와 연관이 없는 인증시 챌린지 이용이 제한될 수 있습니다.</p>
            <Input
              value={instaUrl}
              _size={''}
              placeholder="인증 게시글 링크 붙여넣기"
              onChange={e => {
                setInstaUrl(e.target.value);
              }}
            />
            <div className="flex justify-center">
              <Button onClick={onClickSaveReview} btnType={'primary'} size={'small'}>
                인증하기
              </Button>
              <Button onClick={closeModal} btnType={'borderBlack'} size={'small'}>
                취소
              </Button>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default UploadReviewModal;

type MainChallenge = {
  challenge_id: string;
  title: string;
  startDate: number;
  endDate: number;
} | null;
