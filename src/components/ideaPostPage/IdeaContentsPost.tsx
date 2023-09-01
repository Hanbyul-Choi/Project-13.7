'use client';
import React from 'react';
import { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button, Input, Label } from '@/components/common';

import IdeaImagePost from './IdeaImagePost';
import useIdeaPost from './useIdeaPostUpdate.hook';

function IdeaContentsPost() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [product, setProduct] = useState<string | null>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);

  const router = useRouter();
  const searchParams = useSearchParams();

  const getParamTitle = searchParams.get('title');
  const getParamContent = searchParams.get('content');
  const getParamProduct = searchParams.get('product');
  const getParamImgUrl = searchParams.get('img_url');
  const getParamIsEdit = searchParams.get('is_edit');
  const getParamPostId = searchParams.get('post_id');

  const { isLoading, isError, handleGetImg } = useIdeaPost(imgFile, getParamImgUrl, previewImg, title, content, product, isEdit, setIsEdit, getParamPostId);

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
  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  if (isError) {
    return <div>에러입니다.</div>;
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
  );
}

export default IdeaContentsPost;
