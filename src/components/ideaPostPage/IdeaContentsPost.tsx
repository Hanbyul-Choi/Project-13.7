'use client';
import React from 'react';
import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { v4 } from 'uuid';

import { getLoginUser } from '@/app/api/auth';
import { postChallengeIdea, postChallengeIdeaImg, updateChallengeIdea } from '@/app/api/challenge-idea';
import { Button, Input, Label, useDialog } from '@/components/common';

import IdeaImagePost from './IdeaImagePost';
import { supabase } from '../../../supabase/supabaseConfig';

import type { IdeaPost } from '@/types/db.type';

function IdeaContentsPost() {
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
      router.push('/idea');
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
      <IdeaImagePost setImgFile={setImgFile} setPreviewImg={setPreviewImg} previewImg={previewImg} />
      <div className="flex items-center justify-center mt-20">
        <Button
          type="submit"
          btnType="black"
          size="small"
          onClick={() => {
            router.push('/idea');
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
  );
}

export default IdeaContentsPost;
