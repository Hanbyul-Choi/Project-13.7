'use client';
import React from 'react';
import { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

import { Label, useDialog } from '../common';

interface IdeaImagePostProps {
  setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | undefined>>;
  previewImg: string | ArrayBuffer | undefined;
}

function IdeaImagePost({ setImgFile, setPreviewImg, previewImg }: IdeaImagePostProps) {
  const { Alert } = useDialog();
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
  return (
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
          <div className="w-[33.37rem] h-[21.87rem] rounded-lg overflow-hidden flex items-center justify-center relative ml-[20px]">
            <img src={previewImg} width={535} height={500} alt="Preview Img" />
            <button onClick={handleCancelImg} className="absolute top-2.5 right-[1.56rem] text-[2.5rem]">
              x
            </button>
          </div>
        ) : (
          <>
            <div {...getRootProps()}>
              <input accept="image/*" type="file" {...getInputProps()} onChange={event => handleChangeImg(event)} />
              <div className="rounded-lg font-normal text-base border border-opacityblack w-[33.93rem] ml-[20px] h-20 flex items-center justify-center text-[#bdbdbd] leading-[150%]">챌린지 인증하는 사진 예시를 업로드 하세요.</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default IdeaImagePost;
