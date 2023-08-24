'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import SingleLayout from '@/components/layout/SingleLayout';

import { supabase } from '../../../../supabase/supabaseConfig';

export default function IdeaPostPage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [product, setProduct] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');

  const [imgFile, setImgFile] = useState<File | undefined>(undefined);
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | undefined>(undefined);
  const createdAt = Date.now();

  const ideaData = {
    created_at: new Date(createdAt).toISOString(),
    title,
    content,
    product,
    user_id: userId,
    selected: false,
    img_url: imgUrl,
    likes: 0,
  };

  // 로그인한 user 데이터 가져오기1
  // const getLogintUser = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();
  //   console.log(user?.id);
  // };
  // getLogintUser();

  // 로그인한 user 데이터 가져오기2
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

  // input 선택한 Image => DB state 할당, 미리보기 state 할당
  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

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

  // 등록하기 버튼 click시 실행. supabase storage Image Insert.
  const handleIdeaPost = async () => {
    if (imgFile) {
      const { error } = await supabase.storage.from('project').upload(`challengeSuggestion/${imgFile.name}`, imgFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) {
        console.error('Upload error:', error);
      }
    }
    // handleGetImg();
    const { data } = supabase.storage.from('project').getPublicUrl(`challengeSuggestion/${imgFile?.name}`);
    setImgUrl(data.publicUrl);
    // console.log('File URL:', data.publicUrl);

    const { error } = await supabase.from('challengeSuggestion').insert(ideaData);
    if (error) {
      console.error('Upload error:', error);
    }
  };

  // Image 취소 버튼 click시 실행
  const handleCancelImg = () => {
    setImgFile(undefined);
    setPreviewImg(undefined);
  };

  // 등록하기 버튼 click시 실행. Image getUrl
  // const handleGetImg = async () => {
  //   const { data } = await supabase.storage.from('project').getPublicUrl(`challengeSuggestion/${imgFile?.name}`);

  //   console.log('File URL:', data.publicUrl);
  // };

  // console.log('title', title);
  // console.log('contents', contents);
  // console.log('product', product);
  // console.log(userId);
  console.log(ideaData);
  return (
    // <SingleLayout title="챌린지 제안하기🙌" animal="북극곰을">
    <SingleLayout title="챌린지 제안하기🙌">
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center justify-center">
          <Label size="" name="title">
            챌린지 제목
          </Label>
          <Input placeholder="제목을 입력하세요." _size="lg" id="title" inputStyle="ml-[20px]" onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="flex justify-center my-[24px]">
          <Label size="" name="contents">
            챌린지 내용
          </Label>
          <textarea
            placeholder="내용을 입력하세요."
            id="contents"
            className="rounded-lg font-normal text-base border border-opacityblack outline-none w-[543px] py-[8px] px-[24px] h-[144px] ml-[20px] resize-none"
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Label size="" name="product">
            챌린지 물품
          </Label>
          <Input placeholder="필요 물품을 입력하세요." _size="lg" id="product" inputStyle="ml-[20px]" onChange={e => setProduct(e.target.value)} />
        </div>
        <div className="flex items-center justify-center">
          {/* <Label size="" name="product">
            챌린지 인증 예시
          </Label>
          <Input type="file" placeholder="챌린지를 인증하는 사진 예시를 업로드해주세요!" _size="lg" id="product" inputStyle="ml-[20px]" onChange={e => setProduct(e.target.value)} /> */}
          <Label size="" name="product">
            챌린지 인증 예시
          </Label>
          {typeof previewImg === 'string' ? (
            <div>
              <Image src={previewImg} width={500} height={500} alt="미리보기" />
              <button onClick={handleCancelImg}>x</button>
            </div>
          ) : (
            <input type="file" onChange={event => handleChangeImg(event)} />
          )}
        </div>
        <div className="flex items-center justify-center mt-20">
          <Button btnType="black" size="small">
            취소하기
          </Button>
          <Button btnType="primary" size="small" buttonStyle="ml-6" onClick={handleIdeaPost}>
            등록하기
          </Button>
        </div>
      </form>
    </SingleLayout>
  );
}
