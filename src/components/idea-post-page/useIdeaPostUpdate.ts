import { useRouter } from 'next/navigation';
import { v4 } from 'uuid';

import { getChallengeIdeaImgUrl, postChallengeIdea, postChallengeIdeaImg, updateChallengeIdea } from '@/app/api/challenge-idea';

import { useDialog } from '../common';

import type { Inputs } from './IdeaContentsPost';
import type { IdeaPost } from '@/types/db.type';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

export default function useIdeaPost(
  imgFile: File | undefined,
  imgUrl: string,
  previewImg: string | ArrayBuffer | undefined,
  isEdit: boolean,
  postId: string,
  loginUser: string,
) {
  // const { session } = useSessionStore();
  // const loginUser = session?.user_id;

  const { Alert } = useDialog();
  const router = useRouter();

  const handleGetImg: SubmitHandler<Inputs | FieldValues> = async data => {
    const imgName = v4();
    if (imgFile) {
      postChallengeIdeaImg({ imgFile, imgName });
    }

    const storageImgUrl = await getChallengeIdeaImgUrl(imgName);

    let checkImg = '';
    if (imgUrl) {
      if (previewImg) checkImg = imgFile ? storageImgUrl?.publicUrl! : imgUrl;
    } else if (previewImg && storageImgUrl) {
      checkImg = storageImgUrl!.publicUrl;
    }

    const ideaData = {
      ...data,
      user_id: loginUser!,
      selected: false,
      img_url: checkImg,
    };

    handleIdeaPost(ideaData);
  };

  const handleIdeaPost = (ideaData: IdeaPost | FieldValues) => {
    if (ideaData.user_id === '') {
      Alert('로그인이 필요합니다.');
    } else if (ideaData.title === '') {
      Alert('제목을 입력해주세요');
    } else if (ideaData.content === '') {
      Alert('내용을 입력해주세요');
    } else if (ideaData.img_url === '') {
      Alert('챌린지 인증 예시 사진을 업로드해주세요');
    } else if (isEdit) {
      ideaUpdate(ideaData);
    } else {
      postChallengeIdea(ideaData);
      Alert('작성하신 글이 정상적으로 등록되었습니다.');
      router.push('/idea');
    }
  };

  const ideaUpdate = (ideaData: IdeaPost | FieldValues) => {
    if (postId) {
      const newUdateIdea = { ideaData, postId };
      updateChallengeIdea(newUdateIdea);
      Alert('해당 글이 정상적으로 수정되었습니다.');
      router.push('/idea');
    }
  };
  return { handleGetImg };
}
