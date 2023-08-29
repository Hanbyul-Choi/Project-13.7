'use client';
import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';
import { v4 } from 'uuid';

import { postChallengeIdea } from '@/app/api/challenge-idea';
import { Button, Input, Label, useDialog } from '@/components/common';
import SingleLayout from '@/components/layout/SingleLayout';

import { supabase } from '../../../../supabase/supabaseConfig';

import type { IdeaPost } from '@/types/db.type';

export default function IdeaPostPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);
  const { Alert } = useDialog();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: postChallengeIdea,
  });

  // 로그인한 user 데이터 가져오기
  const handleGetLogintUserId = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUserId(data.session?.user.id);
    }
  };

  // 처음 렌더링됐을때 함수 실행
  useEffect(() => {
    handleGetLogintUserId();
  }, []);

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

  // 등록하기 버튼 click시 실행. supabase storage Image Insert.
  const handleGetImg = async () => {
    const imgName = v4();
    if (imgFile) {
      const { error } = await supabase.storage.from('project').upload(`challengeSuggestion/${imgName}`, imgFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        console.error('Upload error:', error);
      }
    }

    // storage에서 이미지 주소 가져오기. 이미지 URL이 설정된 후에 데이터베이스에 전송
    const { data } = await supabase.storage.from('project').getPublicUrl(`challengeSuggestion/${imgName}`);

    const checkImg = previewImg !== undefined ? data.publicUrl : null;
    const ideaData = {
      title,
      content,
      product,
      user_id: userId,
      selected: false,
      img_url: checkImg,
    };

    handleIdeaPost(ideaData);
  };

  // 유효성 검사 후 DB insert
  const handleIdeaPost = (ideaData: IdeaPost) => {
    if (userId === '') {
      Alert('로그인이 필요합니다.');
    } else if (title === '') {
      Alert('제목을 입력해주세요');
    } else if (content === '') {
      Alert('내용을 입력해주세요');
    } else if (imgFile === undefined) {
      Alert('챌린지 인증 예시 사진을 업로드해주세요');
    } else {
      mutation.mutate(ideaData);
      Alert('작성하신 글이 정상적으로 등록되었습니다.');
      router.push('/idea');
    }
  };

  return (
    <SingleLayout size={true} title="챌린지 제안하기🙌">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center justify-center">
          <Label size="" name="title" labelStyle="w-[5.97rem]">
            <span className="text-nagative">* </span>챌린지 제목
          </Label>
          <Input placeholder="제목을 입력하세요." _size="lg" id="title" inputStyle="ml-[20px]" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex justify-center my-[24px]">
          <Label size="" name="contents" labelStyle="w-[5.97rem]">
            <span className="text-nagative">* </span>챌린지 내용
          </Label>
          <textarea
            placeholder="내용을 입력하세요."
            id="contents"
            className="rounded-lg font-normal text-base border border-opacityblack outline-none w-[543px] py-[8px] px-[24px] h-[144px] ml-[20px] resize-none"
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center my-[24px]">
          <Label size="" name="product" labelStyle="w-[5.97rem]">
            챌린지 물품
          </Label>
          <Input placeholder="필요 물품을 입력하세요." _size="lg" id="product" inputStyle="ml-[20px]" onChange={e => setProduct(e.target.value)} />
        </div>
        <div className="flex justify-center">
          <Label size="" name="challengeImage" labelStyle="w-[5.97rem]">
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
                <Image src={previewImg} width={535} height={500} alt="미리보기" />
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
        <div className="flex items-center justify-center mt-20">
          <Button type="submit" btnType="black" size="small" onClick={() => router.push('/idea')}>
            취소하기
          </Button>
          <Button type="submit" btnType="primary" size="small" buttonStyle="ml-6" onClick={handleGetImg}>
            등록하기
          </Button>
        </div>
      </form>
    </SingleLayout>
  );
}
