import type React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';

import { getLoginUser } from '@/app/api/auth';
import { postChallengeIdea, postChallengeIdeaImg, updateChallengeIdea } from '@/app/api/challenge-idea';

import { supabase } from '../../../supabase/supabaseConfig';
import { useDialog } from '../common';

import type { IdeaPost } from '@/types/db.type';

export default function useIdeaPost(
  imgFile: File | undefined,
  getParamImgUrl: string | null,
  previewImg: string | ArrayBuffer | undefined,
  title: string,
  content: string,
  product: string | null,
  isEdit: boolean,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
  getParamPostId: string | null,
) {
  const [userId, setUserId] = useState<string>('');
  const { Alert } = useDialog();
  const router = useRouter();
  const postIdeaMutation = useMutation({
    mutationFn: postChallengeIdea,
  });
  const postImgMutation = useMutation({
    mutationFn: postChallengeIdeaImg,
  });
  const updateIdeaMutation = useMutation({
    mutationFn: updateChallengeIdea,
  });

  // 로그인한 user 데이터 가져오기
  const { isLoading, isError, data: loginUser } = useQuery(['auth'], getLoginUser);

  // 로그인한 user Id state 할당
  useEffect(() => {
    if (loginUser?.session) {
      setUserId(loginUser.session.user.id);
    }
  }, [loginUser]);

  const handleGetImg = async () => {
    const imgName = v4();

    // 첨부된 image storage upload
    if (imgFile) {
      postImgMutation.mutate({ imgFile, imgName });
    }

    // storage에서 이미지 주소 가져오기. 이미지 URL이 설정된 후에 데이터베이스에 전송
    const { data } = await supabase.storage.from('project').getPublicUrl(`challengeSuggestion/${imgName}`);

    let checkImg = null;
    if (getParamImgUrl) {
      if (previewImg) {
        checkImg = imgFile ? data.publicUrl : getParamImgUrl;
      }
    } else if (previewImg) {
      checkImg = data.publicUrl;
    }

    const ideaData = {
      title,
      content,
      product,
      user_id: userId,
      selected: false,
      img_url: checkImg,
    };

    handleIdeaPost(ideaData);
  };

  // 유효성 검사 후 DB insert or update
  const handleIdeaPost = (ideaData: IdeaPost) => {
    if (userId === '') {
      Alert('로그인이 필요합니다.');
    } else if (title === '') {
      Alert('제목을 입력해주세요');
    } else if (content === '') {
      Alert('내용을 입력해주세요');
    } else if (ideaData.img_url === null) {
      Alert('챌린지 인증 예시 사진을 업로드해주세요');
    } else if (isEdit) {
      ideaUpdate(ideaData);
      Alert('해당 글이 정상적으로 수정되었습니다.');
      setIsEdit(false);
      router.push('/idea');
    } else {
      postIdeaMutation.mutate(ideaData);
      Alert('작성하신 글이 정상적으로 등록되었습니다.');
      router.push('/idea');
    }
  };

  // Challenge Idea update
  const ideaUpdate = (ideaData: IdeaPost) => {
    if (getParamPostId) {
      const newUdateIdea = { ideaData, getParamPostId };
      updateIdeaMutation.mutate(newUdateIdea);
    }
  };
  return { isLoading, isError, handleGetImg };
}
