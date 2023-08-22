'use client';
import { useState } from 'react';

import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';
import SingleLayout from '@/components/layout/SingleLayout';

export default function IdeaPostPage() {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [product, setProduct] = useState<string>('');

  console.log('title', title);
  console.log('contents', contents);
  console.log('product', product);

  return (
    // <SingleLayout title="챌린지 제안하기🙌" animal="북극곰을">
    <SingleLayout title="챌린지 제안하기🙌">
      <form>
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
            onChange={e => setContents(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Label size="" name="product">
            챌린지 물품
          </Label>
          <Input placeholder="필요 물품을 입력하세요." _size="lg" id="product" inputStyle="ml-[20px]" onChange={e => setProduct(e.target.value)} />
        </div>
        <div className="flex items-center justify-center mt-20">
          <Button btnType="black" size="small">
            취소하기
          </Button>
          <Button btnType="primary" size="small" buttonStyle="ml-6">
            등록하기
          </Button>
        </div>
      </form>
    </SingleLayout>
  );
}
