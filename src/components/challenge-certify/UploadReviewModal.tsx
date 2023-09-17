'use client';
import React, { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { v4 } from 'uuid';

import { postCertify } from '@/app/api/challenge-certify';
import { getChallengeIdeaImgUrl, postChallengeIdeaImg } from '@/app/api/challenge-idea';
import { mainChallengeCheck } from '@/app/api/main-challenge';
import { useModalStore } from '@/store/modal.store';
import useSessionStore from '@/store/session.store';

import { supabase } from '../../../supabase/supabaseConfig';
import { Button, useDialog } from '../common';
import Modal from '../common/Modal';
import useToast from '../common/Toast/useToast';
import useImagePost from '../idea-post-page/useImagePost';

import type { CertifyPostType } from '@/types/db.type';

const UploadReviewModal = () => {
  const session = useSessionStore((state: { session: any }) => state.session);
  const { Alert } = useDialog();
  const { toast } = useToast();
  const [instaUrl, setInstaUrl] = useState('');
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);
  const { isOpenMainModal, mainCloseModal } = useModalStore();
  const { handleChangeImg, handleCancelImg } = useImagePost(setImgFile, setPreviewImg);

  const { data: mainChallenge } = useQuery(['mainChallenge'], mainChallengeCheck);
  const queryClient = useQueryClient();
  const certifyPostMutation = useMutation(postCertify, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews']);
    },
  });

  const onClickSaveReview = async () => {
    try {
      if (!mainChallenge) return;
      const imgName = v4();
      if (imgFile) {
        await postChallengeIdeaImg({ imgFile, imgName });
      }
      const storageImgUrl = await getChallengeIdeaImgUrl(imgName);
      const certifyPost: CertifyPostType = {
        user_id: session?.user_id as string,
        insta_url: instaUrl,
        challenge_id: mainChallenge?.challenge_Id,
        img_url: storageImgUrl.publicUrl,
        tags: '#13.7 챌린지',
      };

      certifyPostMutation.mutate(certifyPost);

      const { data: existingUserPoint, error: existingUserPointError } = await supabase
        .from('users')
        .select('point')
        .eq('user_id', session?.user_id)
        .single();

      if (existingUserPointError) {
        console.error('Error fetching existing data:', existingUserPointError);
      } else if (existingUserPoint) {
        const currentPoint = existingUserPoint.point || 0;

        const updatedPoint = currentPoint + 10;

        const { error: updatePointError } = await supabase.from('users').update({ point: updatedPoint }).eq('user_id', session?.user_id).single();

        if (updatePointError) {
          console.error('Error updating user point data:', updatePointError);
        }
        toast('나무 10그루가 지급되었습니다.');
      }

      const { data: existingData, error: existingError } = await supabase
        .from('joinChallenge')
        .select('reviews')
        .match({
          user_id: session?.user_id,
          challenge_id: mainChallenge.challenge_Id,
        })
        .single();

      if (existingError) {
        console.error('Error fetching existing data:', existingError);
      } else if (existingData) {
        const currentReviews = existingData.reviews || 0;

        const updatedReviews = currentReviews + 1;

        const { data: updateData, error: updateError } = await supabase.from('joinChallenge').update({ reviews: updatedReviews }).match({
          user_id: session?.user_id,
          challenge_id: mainChallenge.challenge_Id,
        });

        if (updateError) {
          console.error('Error updating data:', updateError);
        } else {
          console.log('Data updated successfully:', updateData);
        }
      }
      setInstaUrl('');
      mainCloseModal();

      if (existingData?.reviews === 9) {
        try {
          updateChallengeStatus();
        } catch (error) {
          console.log('챌린지 성공여부 업데이트 에러');
        }
      } else {
        Alert('인증완료', '챌린지 인증이 완료되었습니다!');
      }
    } catch (error) {
      console.error('Error adding review', error);
    }
  };

  const updateChallengeStatus = async () => {
    let { data: updatedChallenge } = await supabase
      .from('joinChallenge')
      .update({ completedMission: true })
      .eq('user_id', session?.user_id)
      .gte('reviews', 10)
      .select(`*, mainChallenge(*)`);
    if (updatedChallenge) {
      Alert('챌린지 10회 성공! 마이페이지에서 뱃지를 확인하세요.');
    }
  };

  const animals = {
    animal: '북극곰',
  };

  return (
    <Modal>
      {isOpenMainModal && (
        <div className="flex flex-col justify-center text-center ">
          <div className="max-w-fit px-4 py-1 rounded bg-lightblue m-auto mb-4">
            <p className="text-blue text-sm ">{animals.animal}을 위한 챌린지</p>
          </div>
          <h3 className="mb-8 whitespace-nowrap">{mainChallenge?.title}</h3>
          <div className="text-center">
            {typeof previewImg === 'string' ? (
              <div className="w-[32rem] h-[21.87rem] rounded-lg overflow-hidden relative ">
                <Image src={previewImg} fill alt="Preview" className="object-cover" />
                <button className="absolute top-2.5 right-[1.56rem] text-[2.5rem]" onClick={handleCancelImg}>
                  x
                </button>
              </div>
            ) : (
              <button className="px-4 py-1 border border-blue rounded-lg text-sm text-blue leading-[150%] relative w-[8rem] sm:mb-[12px]">
                인증사진 업로드
                <input
                  type="file"
                  accept="image/*"
                  id="challengeImage"
                  className="absolute left-[-68px] top-0 w-[11.06rem] h-[31px] opacity-0 cursor-pointer"
                  onChange={handleChangeImg}
                />
              </button>
            )}
            <p className="text-sm text-nagative leading-[150%] mt-[8px] whitespace-nowrap md:whitespace-normal">
              주의사항: 타인 도용 및 해당 챌린지와 연관이 없는 인증 시 서비스 이용이 제한됩니다.
            </p>
            {/* <p className="text-red-800">{errorMsg}</p> */}
            <div className="flex justify-center mt-12">
              <Button onClick={mainCloseModal} btnType={'borderBlack'} size={'large'}>
                취소
              </Button>
              <Button onClick={onClickSaveReview} btnType={'primary'} size={'large'} buttonStyle="ml-6">
                인증하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default UploadReviewModal;
