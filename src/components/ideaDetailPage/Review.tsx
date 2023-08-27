'use client';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { useMutation } from 'react-query';

import { postChallengeIdeaComment } from '@/app/api/ideaComments';

import defaultImage from '../../../public/defaultProfileImage.jpeg';
import { supabase } from '../../../supabase/supabaseConfig';
import Button from '../common/Button';
import { Input } from '../common/Input';

type TChallengeId = {
  slug: string;
};

function Review({ slug }: TChallengeId) {
  const [comment, setComment] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const mutation = useMutation({
    mutationFn: postChallengeIdeaComment,
  });

  const handleGetLogintUserId = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUserId(data.session?.user.id);
    }
  };

  // 처음 렌더링됐을 때 함수 실행
  useEffect(() => {
    handleGetLogintUserId();
  }, []);

  // [ ] 나중에 post_id 받아오는걸로 바꾸기
  const commentData = {
    post_id: '6f69f1a0-0d09-4919-a85f-a8c5e30fbb27',
    user_id: userId,
    comment,
  };
  const handlePostComment = () => {
    mutation.mutate(commentData);
  };

  // console.log('commentData:', commentData);
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
        <form
          className="flex flex-row mt-7"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Input placeholder="응원의 댓글을 남겨주세요." type="text" _size="md" onChange={e => setComment(e.target.value)} />
          <Button type="submit" btnType="primary" buttonStyle="ml-[16px]" onClick={handlePostComment}>
            댓글입력
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Review;
