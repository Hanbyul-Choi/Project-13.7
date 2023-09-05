import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';

import { getLoginUser } from '@/app/api/auth';
import { postChallengeIdea, postChallengeIdeaImg, updateChallengeIdea } from '@/app/api/challenge-idea';

import { supabase } from '../../../supabase/supabaseConfig';
import { useDialog } from '../common';

import type { Inputs } from './IdeaContentsPost';
import type { IdeaPost } from '@/types/db.type';
import type { SubmitHandler } from 'react-hook-form';

export default function useIdeaPost(imgFile: File | undefined, imgUrl: string, previewImg: string | ArrayBuffer | undefined, isEdit: boolean, postId: string) {
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

  const handleGetImg: SubmitHandler<Inputs> = async data => {
    const imgName = v4();

    // 첨부된 image storage upload
    if (imgFile) {
      postImgMutation.mutate({ imgFile, imgName });
    }

    // storage에서 이미지 주소 가져오기. 이미지 URL이 설정된 후에 데이터베이스에 전송
    const { data: storageImgUrl } = await supabase.storage.from('project').getPublicUrl(`challengeSuggestion/${imgName}`);

    let checkImg = '';
    if (imgUrl) {
      if (previewImg) {
        checkImg = imgFile ? storageImgUrl.publicUrl : imgUrl;
      }
    } else if (previewImg) {
      checkImg = storageImgUrl.publicUrl;
    }

    const ideaData = {
      ...data,
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
    } else if (ideaData.title === '') {
      Alert('제목을 입력해주세요');
    } else if (ideaData.content === '') {
      Alert('내용을 입력해주세요');
    } else if (ideaData.img_url === '') {
      Alert('챌린지 인증 예시 사진을 업로드해주세요');
    } else if (isEdit) {
      ideaUpdate(ideaData);
      Alert('해당 글이 정상적으로 수정되었습니다.');
      router.push('/idea');
    } else {
      postIdeaMutation.mutate(ideaData);
      Alert('작성하신 글이 정상적으로 등록되었습니다.');
      router.push('/idea');
    }
  };

  // Challenge Idea update
  const ideaUpdate = (ideaData: IdeaPost) => {
    if (postId) {
      const newUdateIdea = { ideaData, postId };
      updateIdeaMutation.mutate(newUdateIdea);
    }
  };
  return { isLoading, isError, handleGetImg };
}
