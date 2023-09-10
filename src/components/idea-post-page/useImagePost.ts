import type React from 'react';
import { useCallback, useEffect } from 'react';

import { useDialog } from '../common';

export default function useImagePost(setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | undefined>>, imgUrl?: string) {
  const { Alert } = useDialog();

  useEffect(() => {
    if (imgUrl) {
      setPreviewImg(imgUrl);
    }
  }, []);

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      imgUpload(selectedFile);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const [selectedFile] = acceptedFiles;
    const imgExtension = selectedFile.name.split('.')[1];
    const extension = ['jpeg', 'jpg', 'png', 'GIF'].includes(imgExtension);
    if (extension) {
      imgUpload(selectedFile);
    } else {
      Alert('이미지는 jpeg, jpg, png, gif 확장자만 첨부할 수 있습니다');
    }
  }, []);

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

  const handleCancelImg = () => {
    setImgFile(undefined);
    setPreviewImg(undefined);
  };

  return { handleChangeImg, onDrop, handleCancelImg };
}
