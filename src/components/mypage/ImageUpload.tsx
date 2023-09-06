import React, { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';

import { getImgUrl, postUserProfileImg } from '@/app/api/mypage';

interface ImageUploadProps {
  onSuccess: (imageUrl: string) => void;
}

export function ImageUpload({ onSuccess }: ImageUploadProps) {
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

  const postImgMutation = useMutation({
    mutationFn: postUserProfileImg,
  });

  const uploadImageAndGetUrl = async (imgFile: File, imgName: string) => {
    await postImgMutation.mutateAsync({ imgFile, imgName });

    const imgUrlResponse = await getImgUrl(imgName);

    console.log('imgUrl check:', getImgUrl);
    console.log('imgUrl check imgName:', imgName);

    return imgUrlResponse.data.publicUrl;
  };

  const handleImageUpload = async () => {
    try {
      if (imgFile && postImgMutation.isSuccess) {
        const imgName = v4();
        const imgUrl = await uploadImageAndGetUrl(imgFile, imgName);
        onSuccess(imgUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
    }
  };

  const handleImageChange = (selectedFile: File | undefined) => {
    if (selectedFile) {
      setImgFile(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          setPreviewImg(reader.result);
          console.log('Selected file:', selectedFile);
          console.log('Preview image data:', reader.result);
          await handleImageUpload();
        } else {
          setPreviewImg(undefined);
        }
      };
    }
  };

  const handleImageCancel = () => {
    setImgFile(undefined);
    setPreviewImg(undefined);
  };

  const { getRootProps, getInputProps } = useDropzone();

  return (
    <>
      {typeof previewImg === 'string' ? (
        <div className="flex flex-col items-center">
          <img src={previewImg} alt="Preview Profile Image" width={100} height={100} className="rounded-full inline-block mb-4" />
          <button className="text-sm opacity-50 mb-2" onClick={handleImageCancel}>
            현재 이미지 삭제
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <div {...getRootProps}>
              <img
                src="https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/userProfileImg/userProfileDefault?t=2023-09-04T01%3A41%3A06.168Z"
                alt="profileDefaultImg"
                width={100}
                height={100}
                className="rounded-full inline-block mb-4"
              />
            </div>
            <label className="cursor-pointer text-sm opacity-50 mb-2">
              <input
                accept="image/*"
                type="file"
                {...getInputProps()}
                onChange={event => {
                  return handleImageChange(event.target.files?.[0]);
                }}
              />
              이미지 선택하기
            </label>
          </div>
        </>
      )}
    </>
  );
}
