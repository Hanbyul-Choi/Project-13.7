'use client';
import React from 'react';

import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

import useImagePost from './useImagePost';
import { Label } from '../common';

interface IdeaImagePostProps {
  setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | undefined>>;
  previewImg: string | ArrayBuffer | undefined;
  imgUrl: string;
}

function IdeaImagePost({ setImgFile, setPreviewImg, previewImg, imgUrl }: IdeaImagePostProps) {
  const { handleChangeImg, onDrop, handleCancelImg } = useImagePost(setImgFile, setPreviewImg, imgUrl);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div className="flex justify-center">
      <Label size="" name="challengeImage" labelStyle="w-[6.97rem] h-full">
        <span className="text-nagative">* </span>챌린지
        <br /> 인증 예시
      </Label>
      <div className="flex flex-col">
        <button className="px-4 py-1 border border-blue rounded-lg text-sm text-blue leading-[150%] relative ml-[20px] w-[6.93rem] mb-[12px]">
          파일 찾아보기
          <input type="file" accept="image/*" id="challengeImage" className="absolute left-[-68px] top-0 w-[11.06rem] h-[31px] opacity-0 cursor-pointer" onChange={event => handleChangeImg(event)} />
        </button>

        {typeof previewImg === 'string' ? (
          <div className="w-[32rem] h-[21.87rem] rounded-lg overflow-hidden relative ml-[20px] ">
            <Image src={previewImg} fill alt="Preview Img" className="object-cover" />
            <button onClick={handleCancelImg} className="absolute top-2.5 right-[1.56rem] text-[2.5rem]">
              x
            </button>
          </div>
        ) : (
          <div {...getRootProps()}>
            <input accept="image/*" type="file" {...getInputProps()} onChange={event => handleChangeImg(event)} />
            <div className="rounded-lg font-normal text-base border border-opacityblack ml-[20px] h-20 flex items-center justify-center text-[#bdbdbd] leading-[150%] w-[32rem]">챌린지 인증하는 사진 예시를 업로드 하세요.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IdeaImagePost;
