import React from 'react';
import { useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { v4 } from 'uuid';

import { postUserProfileImg } from '@/app/api/mypage';
import { Button, Input } from '@/components/common';
import useSessionStore from '@/store/sesson.store';

import RankingGuide from './RankingGuide';
import { supabase } from '../../../supabase/supabaseConfig';

import type { User } from '@/types/db.type';

export default function UserProfile() {
  const session = useSessionStore((state: { session: any }) => state.session);

  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>(null);

  // useQuery를 사용하여 사용자 프로필 가져오기
  const { data: userProfile } = useQuery(['userProfile', session?.user_id], async () => {
    const response = await supabase.from('users').select('*').eq('user_id', session?.user_id);
    return response.data?.[0];
  });

  // useMutation을 사용하여 사용자 프로필 업데이트
  const editProfileMutation = useMutation(['editProfile', session?.user_id], async (updatedProfile: User) => {
    const imgName = v4();
    try {
      if (imgFile) {
        postImgMutation.mutate({ imgFile, imgName });
      }
      return supabase.from('users').update(updatedProfile).eq('user_id', session?.user_id);
    } catch (error) {}
  });

  const handleEditClick = () => {
    setEditMode(true);
    setEditedProfile((prev: any) => ({
      ...prev,
      nickname: userProfile?.nickname || '',
      address: userProfile?.address || '',
      profile_img: userProfile?.profile_img || '',
      user_id: userProfile?.user_id || '',
      created_at: userProfile?.created_at || '',
      point: userProfile?.point || 0,
      email: userProfile?.email || '',
    }));
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setPreviewImg(undefined);
  };

  const postImgMutation = useMutation({
    mutationFn: postUserProfileImg,
  });

  // 이미지를 저장소에 업로드하고 이미지 URL을 반환하는 함수
  const uploadImageAndGetUrl = async (imgFile: File, imgName: string) => {
    await postImgMutation.mutateAsync({ imgFile, imgName });

    // 이미지 URL 받아오기
    const imgUrlResponse = await supabase.storage.from('project').getPublicUrl(`userProfileImg/${imgName}`);
    return imgUrlResponse;
  };

  const handleSaveClick = async () => {
    if (!editedProfile) {
      return;
    }
    try {
      if (imgFile && postImgMutation.isSuccess) {
        const imgName = v4();
        const imgUrlResponse = await uploadImageAndGetUrl(imgFile, imgName);
        const imgUrl = imgUrlResponse.data.publicUrl;

        // 유저 프로필 정보 업데이트
        const updatedProfile = {
          ...editedProfile,
          profile_img: imgUrl,
        };

        await editProfileMutation.mutateAsync(updatedProfile);
      } else {
        await editProfileMutation.mutateAsync(editedProfile);
      }

      setEditMode(false);
      setImgFile(undefined); // imgFile 상태 초기화
      setPreviewImg(undefined);
    } catch (error) {
      console.error('사용자 프로필 업데이트 오류:', error);
    }
  };

  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);
  const { getRootProps, getInputProps } = useDropzone();

  // input에서 사진 첨부 => DB state 할당, 미리보기 state 할당 함수 실행
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      imgUpload(selectedFile);
    }
  };

  // Image 취소 버튼 click시 실행
  const handleCancelImg = () => {
    setImgFile(undefined);
    setPreviewImg(undefined);
  };

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

  return (
    <>
      {editMode ? (
        <>
          <div className="text-center mb-8">
            <div className="flex flex-col text-center">
              {typeof previewImg === 'string' ? (
                <div className="flex flex-col items-center">
                  <img src={previewImg} alt="Preview Profile Image" width={100} height={100} className="rounded-full inline-block mb-4" />
                  <button className="text-sm opacity-50 mb-2" onClick={handleCancelImg}>
                    현재 이미지 삭제
                  </button>
                </div>
              ) : (
                <>
                  <div {...getRootProps()}>
                    <input accept="image/*" type="file" {...getInputProps()} onChange={event => handleChangeImg(event)} />
                    <img src={userProfile?.profile_img ? `${userProfile?.profile_img}` : '../../assets/profileDefaultImg.png'} alt="profileDefaultImg" width={100} height={100} className="rounded-full inline-block mb-4" />
                  </div>
                </>
              )}
              <input type="file" accept="image/*" id="profileImg" className="cursor-pointer" onChange={e => handleChangeImg(e)} />
            </div>
            <div className="space-y-1 flex flex-col">
              <Input type="text" value={editedProfile?.nickname || ''} onChange={e => setEditedProfile((prev: any) => ({ ...prev, nickname: e.target.value }))} placeholder="이름" _size={'sm'} />
              <Input type="text" value={editedProfile?.address || ''} onChange={e => setEditedProfile((prev: any) => ({ ...prev, address: e.target.value }))} placeholder="주소" _size={'sm'} />
            </div>
            <div className="flex gap-2 justify-center mx-auto my-2">
              <Button btnType={'borderBlack'} size={'small'} onClick={handleCancelClick}>
                수정 취소
              </Button>
              <Button btnType={'black'} size={'small'} onClick={handleSaveClick}>
                저장하기
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-4 mx-auto">
            <img src={userProfile?.profile_img ? `${userProfile?.profile_img}` : '../../assets/profileDefaultImg.png'} alt="profileDefaultImg" width={100} height={100} className="rounded-full inline-block mb-4" />
            <div className="flex justify-center items-center gap-1 p-2">
              <p className="font-semibold text-lg">{userProfile?.nickname}</p>
              <div className="z-100">
                <RankingGuide />
              </div>
            </div>
            <p className="text-sm opacity-50">{userProfile?.address}</p>
            <div className="flex justify-center items-center my-3">
              <Button btnType={'borderBlack'} size={'small'} onClick={handleEditClick}>
                프로필 수정
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
