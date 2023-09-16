import React from 'react';

import useCertify from './certify.hook';
import UploadReviewModal from './UploadReviewModal';
import { Button } from '../common';

export function CertifyPost({ challengeId, user_id }: { challengeId: string; user_id: string | undefined }) {
  const { onClickUploadReview, onClickUploadReviewFalseConfirm, joinChallenge, isOpenMainModal, isFetched } = useCertify(user_id, challengeId);
  if (!isFetched) {
    return;
  }
  return (
    <>
      {joinChallenge ? (
        <Button onClick={onClickUploadReview} btnType={'black'} size="medium">
          인증하기
        </Button>
      ) : (
        <Button onClick={onClickUploadReviewFalseConfirm} btnType={'black'} size="medium">
          챌린지 참여하기
        </Button>
      )}
      {isOpenMainModal && <UploadReviewModal />}
    </>
  );
}
