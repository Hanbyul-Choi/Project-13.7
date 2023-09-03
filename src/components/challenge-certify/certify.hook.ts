'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { userJoinChallengeCheck } from '@/app/api/join-challenge';
import { useModalStore } from '@/store/modal.store';

import { useDialog } from '../common';

export default function useCertify(user_id: string | undefined, challenge_id: string) {
  const route = useRouter();
  const { Alert, Confirm } = useDialog();
  const { mainOpenModal, isOpenMainModal } = useModalStore();

  const { data: joinChallenge } = useQuery(['joinChallenge'], () => userJoinChallengeCheck(user_id, challenge_id));

  const onClickUploadReview = () => {
    mainOpenModal();
  };

  const onClickUploadReviewFalseConfirm = async () => {
    if (!user_id) return Alert('로그인이 필요합니다');
    const confirmed = await Confirm('챌린지에 먼저 참여해주세요. 인증에 필요한 굿즈를 보내드립니다 :)');
    if (confirmed) {
      route.push('/challenge');
    } else {
      route.push('/challenge/certify');
    }
  };

  return { onClickUploadReview, onClickUploadReviewFalseConfirm, joinChallenge, isOpenMainModal };
}
