import React from 'react';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';

import { getImgUrl, postUserProfileImg } from '@/app/api/mypage';

interface ImageUploadProps {
  onSuccess: (imageUrl: string) => void;
  profileImg?: string | null | undefined;
}

const profileDefault = 'https://fvkzqozjdtlaogexuuin.supabase.co/storage/v1/object/public/project/userProfileImg/userProfileDefault?t=2023-09-04T01%3A41%3A06.168Z';

export function ImageUpload({ onSuccess, profileImg }: ImageUploadProps) {
  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | undefined>(undefined);

  const postImgMutation = useMutation({
    mutationFn: postUserProfileImg,
    onSuccess: data => {
      console.log('이미지 업로드 성공:', data);
    },
    onError: error => {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    },
  });

  const uploadImageAndGetUrl = async (imgFile: File, imgName: string) => {
    console.log('Entering uploadImageAndGetUrl');
    try {
      postImgMutation.mutateAsync({ imgFile, imgName });
    } catch (error) {
      console.error('예외 발생:', error);
    }

    try {
      const imgUrlResponse = await getImgUrl(imgName);
      return imgUrlResponse.data.publicUrl;
    } catch (error) {
      console.error('getImgUrl 오류:', error);
      throw error;
    }
  };

  const handleImageUpload = async () => {
    console.log('Entering handleImageUpload');
    try {
      // if문 여기가 문제
      if (imgFile && postImgMutation.isSuccess) {
        const imgName = v4();
        const imgUrl = await uploadImageAndGetUrl(imgFile, imgName);

        console.log('Image URL:', imgUrl);
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

          // console.log('Selected file:', selectedFile);
          // console.log('Preview image data:', reader.result);

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

  const { getInputProps } = useDropzone();

  return (
    <>
      {typeof previewImg === 'string' ? (
        <div className="flex flex-col items-center">
          <Image src={previewImg} alt="Preview Profile Image" width={100} height={100} className="w-32 h-32 flex justify-center overflow-hidden object-cover rounded-md mx-auto m-2" />
          <button className="text-sm opacity-50 mb-2" onClick={handleImageCancel}>
            현재 이미지 삭제
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Image src={profileImg || profileDefault} alt="profileDefaultImg" width={100} height={100} className="w-32 h-32 flex justify-center overflow-hidden object-cover rounded-md mx-auto m-2" />
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
