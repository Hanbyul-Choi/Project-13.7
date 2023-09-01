import type React from 'react';
import { useCallback } from 'react';

import { useDialog } from '../common';

export default function useImagePost(setImgFile: React.Dispatch<React.SetStateAction<File | undefined>>, setPreviewImg: React.Dispatch<React.SetStateAction<string | ArrayBuffer | undefined>>) {
  const { Alert } = useDialog();

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

  return { handleChangeImg, onDrop, handleCancelImg };
}
