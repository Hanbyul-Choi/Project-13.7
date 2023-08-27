import React from 'react';

import Image from 'next/image';

import defaultImage from '../../../public/defaultProfileImage.jpeg';
import Button from '../common/Button';
import { Input } from '../common/Input';

type TChallengeId = {
  slug: string;
};

function Review({ slug }: TChallengeId) {
  return (
    <div>
      {/* ex.댓글 2 */}
      <h4 className="mb-3">댓글 {slug}</h4>
      <div className="flex justify-center flex-col">
        <div className="flex items-center flex-row justify-start my-3">
          <Image src={defaultImage} width={55} height={55} alt="Default Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
          <div>
            <div className="flex flex-row text-sm text-[#838384] leading-[150%]">
              {/* userId */}
              <p>{slug}User ID-1</p>
              {/* Date */}
              <p>{slug}2023.08.18</p>
            </div>
            {/* 댓글 내용 */}
            <p className="leading-[150%]">{slug}응원의 댓글을 남겨주세요.</p>
          </div>
        </div>
        {/* WARNING map 사용해서 반복 줄일 것*/}
        <div className="flex items-center flex-row justify-start my-3">
          <Image src={defaultImage} width={55} height={55} alt="Default Profile Image" className="mr-[16px] shadow-[0_1px_5px_0_rgba(53,60,73,0.08)] rounded-lg " />
          <div>
            <div className="flex flex-row text-sm text-[#838384] leading-[150%]">
              {/* userId */}
              <p>{slug}User ID-1</p>
              {/* Date */}
              <p>{slug}2023.08.18</p>
            </div>
            {/* 댓글 내용 */}
            <p className="leading-[150%]">{slug}응원의 댓글을 남겨주세요.</p>
          </div>
        </div>
        <form className="flex flex-row mt-7">
          <Input type="text" _size="md" />
          <Button btnType="primary" buttonStyle="ml-[16px]">
            댓글입력
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Review;
