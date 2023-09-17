import React, { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { AiOutlineClose } from 'react-icons/ai';

import { getTotalNumberDonation, postDonationHistory, udpateUserPoint, updateTotalNumberDonation } from '@/app/api/mypage';
import { TOTAL_DONATION } from '@/app/shared/queries.keys';
import { useModalStore } from '@/store/modal.store';

import { Button, useDialog } from '../common';
import Modal from '../common/Modal';

export const donationGuide =
  '프로젝트 13.7에서 창출되는 이익과 참여자분들이 후원해주신 나무는 월 1회 한화로 환산하여 세계자연기금 WWF를 통해 후원됩니다.';

interface TreeDonationProps {
  curUserTrees: number;
  userId: string;
}
type PartialDonationHistory = {
  point: number;
  user_id: string;
};

const TreeDonation = ({ curUserTrees, userId }: TreeDonationProps) => {
  const { sub2CloseModal } = useModalStore(state => state);
  const [count, setCount] = useState(0);

  const { Alert } = useDialog();

  const donationData: PartialDonationHistory = {
    point: count,
    user_id: userId,
  };

  const { data: curTotalTrees } = useQuery([TOTAL_DONATION], getTotalNumberDonation) as { data: number };

  const plusButtonHanlder = () => {
    const newPlusCount = count + 1;
    setCount(newPlusCount);
  };
  const minusButtonHanlder = () => {
    const newMinusCount = count - 1 >= 0 ? count - 1 : 0;
    setCount(newMinusCount);
  };

  const onClickDonation = async () => {
    const updatedTotalTrees = curTotalTrees + count;
    const updatedUserTrees = curUserTrees - count;

    if (count > 0 && count < curUserTrees) {
      await updateTotalNumberDonation(updatedTotalTrees);
      await udpateUserPoint(updatedUserTrees, userId);
      await postDonationHistory(donationData);

      await Alert(`지금까지 모인 나무 총 ${updatedTotalTrees} 그루`, '후원이 완료되었습니다.');
      sub2CloseModal();
      window.location.reload();
    } else {
      await Alert('후원하실 나무의 갯수를 확인해주세요.', '나무 1 그루부터 후원이 가능합니다.');
    }
  };

  return (
    <>
      <Modal>
        <div className="md:w-[29rem] w-[24rem] flex flex-col px-2 justify-evenly">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold py-2">나무 후원하고 동물 지키기</p>
            <button onClick={sub2CloseModal}>
              <AiOutlineClose size={25} />
            </button>
          </div>
          <div className="border-t border-black opacity-25 mb-6 justify-between"></div>
          <p>{donationGuide}</p>
          <div className="py-6">
            <div className="flex gap-2 items-center">
              <p>현재 나의 나무 :</p>
              <p>{curUserTrees}</p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <p>후원할 나무 :</p>
                <h4>{count}</h4>
              </div>
              <div className="flex gap-2">
                <Button onClick={minusButtonHanlder} btnType={'borderBlack'} size="small">
                  -
                </Button>
                <Button onClick={plusButtonHanlder} btnType={'black'} size="small">
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="my-2" onClick={sub2CloseModal}>
            <Button onClick={onClickDonation} btnType={'primary'} size={'full'}>
              후원하기
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TreeDonation;
