'use client';
import React from 'react';
import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Label } from '@/components/common';

import IdeaImagePost from './IdeaImagePost';
import useIdeaPost from './useIdeaPostUpdate.hook';
export interface Inputs {
  title: string;
  content: string;
  product?: string;
}

function IdeaContentsPost() {
  const inputStyle = 'rounded-lg font-normal text-base border border-opacityblack outline-none w-[543px] py-[8px] px-[24px] ml-[20px] resize-none';
  const { register, handleSubmit } = useForm<Inputs>();
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);

  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get('title');
  const content = searchParams.get('content');
  const product = searchParams.get('product') ?? '';
  const imgUrl = searchParams.get('img_url') ?? '';
  const isEdit = Boolean(searchParams.get('is_edit'));
  const postId = searchParams.get('post_id') ?? '';

  const { isLoading, isError, handleGetImg } = useIdeaPost(imgFile, imgUrl, previewImg, isEdit, postId);

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
        <input placeholder="제목을 입력하세요." className={`${inputStyle}`} id="title" defaultValue={title!} {...register('title')} />
      </div>
      <div className="flex justify-center my-[24px]">
        <Label size="" name="content" labelStyle="w-[6.97rem]">
          <span className="text-nagative">* </span>챌린지 내용
        </Label>
        <textarea
          placeholder="내용을 입력하세요."
          id="content"
          defaultValue={content!}
          className="rounded-lg font-normal text-base border border-opacityblack outline-none w-[543px] py-[8px] px-[24px] h-[144px] ml-[20px] resize-none"
          {...register('content')}
        />
      </div>
      <div className="flex items-center justify-center my-[24px]">
        <Label size="" name="product" labelStyle="w-[6.97rem]">
          챌린지 물품
        </Label>
        <input placeholder="필요 물품을 입력하세요." id="product" defaultValue={product} className={`${inputStyle}`} {...register('product')} />
      </div>
      <IdeaImagePost setImgFile={setImgFile} setPreviewImg={setPreviewImg} previewImg={previewImg} imgUrl={imgUrl} />
      <div className="flex items-center justify-center mt-20">
        <Button
          type="submit"
          btnType="black"
          size="small"
          onClick={() => {
            router.back();
          }}
        >
          취소하기
        </Button>
        <Button type="submit" btnType="primary" size="small" buttonStyle="ml-6" onClick={handleSubmit(handleGetImg)}>
          {isEdit ? '수정하기' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}

export default IdeaContentsPost;
