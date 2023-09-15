'use client';
import React from 'react';
import { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { updateUserPointIdea } from '@/app/api/challenge-idea';
import { Button, Label } from '@/components/common';
import useSessionStore from '@/store/session.store';

import IdeaImagePost from './IdeaImagePost';
import useIdeaPost from './useIdeaPostUpdate';

export interface Inputs {
  title: string;
  content: string;
  product?: string;
}

function IdeaContentsPost() {
  const inputStyle = 'rounded-lg font-normal text-base border border-opacityblack outline-none w-full py-2 px-6 sm:ml-[20px] ';
  const { register, handleSubmit } = useForm<Inputs>();
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);

  const router = useRouter();
  const searchParams = useSearchParams();

  const title = searchParams.get('title');
  const content = searchParams.get('content');
  const product = searchParams.get('product') ?? '';
  const imgUrl = searchParams.get('img_url');
  const isEdit = Boolean(searchParams.get('is_edit'));
  const postId = searchParams.get('post_id');

  const { session } = useSessionStore();
  const loginUser = session?.user_id;
  const curUserPoint = session?.point;

  const { handleGetImg } = useIdeaPost(imgFile, imgUrl!, previewImg, isEdit, postId!, loginUser!);

  const pointUpdate = async () => {
    if (curUserPoint !== undefined && loginUser !== undefined) {
      const updatedPoint = curUserPoint + 5;
      await updateUserPointIdea(updatedPoint, loginUser);
    }
  };

  const onSubmit = async (data: Inputs) => {
    await handleGetImg(data);
    await pointUpdate();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex sm:items-center justify-center flex-col sm:flex-row">
        <Label size="" name="title" labelStyle="w-[8rem] mb-[10px] sm:mb-0">
          <span className="text-nagative">* </span>챌린지 제목
        </Label>
        <input placeholder="제목을 입력하세요." className={`${inputStyle}`} id="title" defaultValue={title!} {...register('title')} />
      </div>
      <div className="flex justify-center my-[24px] flex-col sm:flex-row">
        <Label size="" name="content" labelStyle="w-[8rem] mb-[10px] sm:mb-0">
          <span className="text-nagative">* </span>챌린지 내용
        </Label>
        <textarea
          placeholder="내용을 입력하세요."
          id="content"
          defaultValue={content!}
          className="rounded-lg font-normal text-base border border-opacityblack outline-none w-full py-2 px-6 h-[144px] sm:ml-[20px] resize-none"
          {...register('content')}
        />
      </div>
      <div className="flex sm:items-center justify-center my-[24px] flex-col sm:flex-row">
        <Label size="" name="product" labelStyle="w-[8rem] mb-[10px] sm:mb-0">
          챌린지 물품
        </Label>
        <input placeholder="필요 물품을 입력하세요." id="product" defaultValue={product} className={`${inputStyle}`} {...register('product')} />
      </div>
      <IdeaImagePost setImgFile={setImgFile} setPreviewImg={setPreviewImg} previewImg={previewImg} imgUrl={imgUrl!} />
      <div className="flex sm:items-center justify-center mt-10 md:mt-20">
        <Button
          type="button"
          btnType="black"
          size="small"
          onClick={() => {
            router.back();
          }}
        >
          취소하기
        </Button>
        <Button type="submit" btnType="primary" size="small" buttonStyle="ml-6">
          {isEdit ? '수정하기' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}

export default IdeaContentsPost;
