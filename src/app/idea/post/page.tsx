'use client';
import { useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';

import { getLoginUser } from '@/app/api/auth';
import { postChallengeIdea, postChallengeIdeaImg, updateChallengeIdea } from '@/app/api/challenge-idea';
import { Button, Input, Label, useDialog } from '@/components/common';
import SingleLayout from '@/components/layout/SingleLayout';

import { supabase } from '../../../../supabase/supabaseConfig';

import type { IdeaPost } from '@/types/db.type';

export default function IdeaPostPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [product, setProduct] = useState<string | null>('');
  const [userId, setUserId] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);
  const { Alert } = useDialog();
  const router = useRouter();
  const searchParams = useSearchParams();
  const postIdeaMutation = useMutation({
    mutationFn: postChallengeIdea,
  });
  const postImgMutation = useMutation({
    mutationFn: postChallengeIdeaImg,
  });
  const updateIdeaMutation = useMutation({
    mutationFn: updateChallengeIdea,
  });

  const getParamTitle = searchParams.get('title');
  const getParamContent = searchParams.get('content');
  const getParamProduct = searchParams.get('product');
  const getParamImgUrl = searchParams.get('img_url');
  const getParamIsEdit = searchParams.get('is_edit');
  const getParamPostId = searchParams.get('post_id');
  console.log('🚀 ~ file: page.tsx:42 ~ IdeaPostPage ~ getParamContent:', getParamContent);

  // 로그인한 user 데이터 가져오기
  const { isLoading, isError, data: loginUser } = useQuery(['auth'], getLoginUser);

  // 로그인한 user Id state 할당
  useEffect(() => {
    if (loginUser?.session) {
      setUserId(loginUser.session.user.id);
    }
  }, [loginUser]);

  // 처음 렌더링됐을 때 param state 할당
  useEffect(() => {
    if (getParamTitle && getParamContent && getParamImgUrl) {
      setTitle(getParamTitle);
      setContent(getParamContent);
      setProduct(getParamProduct);
      setIsEdit(Boolean(getParamIsEdit));
      setPreviewImg(getParamImgUrl);
    }
  }, []);

  // input에서 사진 첨부 => DB state 할당, 미리보기 state 할당 함수 실행
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // Access the selected file
    if (selectedFile) {
      imgUpload(selectedFile);
    }
  };

  // Drag & Drop 사진 첨부 => DB state 할당, 미리보기 state 할당 함수 실행
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [selectedFile] = acceptedFiles; // Access the selected file
    const imgExtension = selectedFile.name.split('.')[1];
    const extension = ['jpeg', 'jpg', 'png', 'GIF'].includes(imgExtension);
    if (extension) {
      imgUpload(selectedFile);
    } else {
      Alert('이미지는 jpeg, jpg, png, gif 확장자만 첨부할 수 있습니다');
    }
  }, []);

  // [x] accept 속성 추가 오류. Alert으로 해결.
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // 첨부된 파일 읽고 DB state 할당, 미리보기 state 할당
  const imgUpload = (selectedFile: File) => {
    if (selectedFile) {
      setImgFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewImg(reader.result);
        }
      };
    }
  };

  // Image 취소 버튼 click시 실행
  const handleCancelImg = () => {
    setImgFile(undefined);
    setPreviewImg(undefined);
  };

  // 등록하기 버튼 click시 실행. supabase storage Image Insert.
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
      console.log('edit', ideaData);
      ideaUpdate(ideaData);
      Alert('해당 글이 정상적으로 수정되었습니다.');
      setIsEdit(false);
      router.back();
    } else {
      console.log('post', ideaData);
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

  if (isLoading) {
    return <p>로딩중입니다.</p>;
  }
  if (isError) {
    return <p>에러입니다.</p>;
  }

  return (
    <SingleLayout size={true} title="챌린지 제안하기🙌">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center justify-center">
          <Label size="" name="title" labelStyle="w-[6.97rem]">
            <span className="text-nagative">* </span>챌린지 제목
          </Label>
          <Input placeholder="제목을 입력하세요." _size="lg" id="title" inputStyle="ml-[20px]" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex justify-center my-[24px]">
          <Label size="" name="contents" labelStyle="w-[6.97rem]">
            <span className="text-nagative">* </span>챌린지 내용
          </Label>
          <textarea
            placeholder="내용을 입력하세요."
            id="contents"
            value={content}
            className="rounded-lg font-normal text-base border border-opacityblack outline-none w-[543px] py-[8px] px-[24px] h-[144px] ml-[20px] resize-none"
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center my-[24px]">
          <Label size="" name="product" labelStyle="w-[6.97rem]">
            챌린지 물품
          </Label>
          <Input placeholder="필요 물품을 입력하세요." _size="lg" id="product" value={product ? product : ''} inputStyle="ml-[20px]" onChange={e => setProduct(e.target.value)} />
        </div>
        <div className="flex justify-center">
          <Label size="" name="challengeImage" labelStyle="w-[6.97rem]">
            <span className="text-nagative">* </span>챌린지
            <br /> 인증 예시
          </Label>
          <div className="flex flex-col">
            <button className="px-4 py-1 border border-blue rounded-lg text-sm text-blue leading-[150%] relative ml-[20px] w-[6.93rem] mb-[12px]">
              파일 찾아보기
              <input type="file" accept="image/*" id="challengeImage" className="absolute left-[-68px] top-0 w-[11.06rem] h-[31px] opacity-0 cursor-pointer" onChange={event => handleChangeImg(event)} />
            </button>

            {typeof previewImg === 'string' ? (
              <div className="w-[32rem] h-[21.87rem] rounded-lg overflow-hidden flex items-center justify-center relative ml-[20px]">
                <img src={previewImg} width={535} height={500} alt="Preview Img" />
                <button onClick={handleCancelImg} className="absolute top-2.5 right-[1.56rem] text-[2.5rem]">
                  x
                </button>
              </div>
            ) : (
              <>
                <div {...getRootProps()}>
                  <input accept="image/*" type="file" {...getInputProps()} onChange={event => handleChangeImg(event)} />
                  <div className="rounded-lg font-normal text-base border border-opacityblack w-[33.93rem] ml-[20px] h-20 flex items-center justify-center text-[#bdbdbd] leading-[150%] w-[32rem]">챌린지 인증하는 사진 예시를 업로드 하세요.</div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mt-20">
          <Button
            type="submit"
            btnType="black"
            size="small"
            onClick={() => {
              router.back();
              setIsEdit(false);
            }}
          >
            취소하기
          </Button>
          <Button type="submit" btnType="primary" size="small" buttonStyle="ml-6" onClick={handleGetImg}>
            {isEdit ? '수정하기' : '등록하기'}
          </Button>
        </div>
      </form>
    </SingleLayout>
  );
}
