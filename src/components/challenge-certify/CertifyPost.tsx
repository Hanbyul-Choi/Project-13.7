import React from 'react';

import useCertify from './certify.hook';
import UploadReviewModal from './UploadReviewModal';
import { Button } from '../common';

export function CertifyPost({ challengeId, user_id }: { challengeId: string; user_id: string | undefined }) {
  const { onClickUploadReview, onClickUploadReviewFalseConfirm, joinChallenge, isOpenMainModal } = useCertify(user_id, challengeId);

  return (
    <>
      {joinChallenge ? (
        <Button onClick={onClickUploadReview} btnType={'primary'} size="small">
          인증하기
        </Button>
      ) : (
        <Button onClick={onClickUploadReviewFalseConfirm} btnType={'primary'} size="small">
          챌린지 참여하기
        </Button>
      )}
      {isOpenMainModal && <UploadReviewModal />}
    </>
  );
}
