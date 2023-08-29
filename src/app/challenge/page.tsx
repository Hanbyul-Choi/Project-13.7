'use client';
import React from 'react';

import JoinChallenge from '@/components/challenge-post/JoinChallenge';
import MainChallengeData from '@/components/challenge-post/MainChallengeData';

export default function ChallengePage() {
  return (
    <>
      <div>challengePage</div>
      <MainChallengeData />
      <JoinChallenge />
    </>
    // import { Button } from '@/components/common';
    // import SingleLayout from '@/components/layout/SingleLayout';

    // export default function ChallengePage() {
    //   return (
    //     <SingleLayout title="대중교통 이용하기" animal="북극곰을">
    //       <div>
    //         <h5 className="mb-4 flex items-center before:content-[' '] before:w-[2px] before:bg-blue before:h-[18px] before:inline-block before:mr-[8px]">챌린지 내용</h5>
    //         <p className="text-lg leading-[140%]">챌린지내용</p>
    //       </div>
    //       <div className="mt-10">
    //         <h5 className="mb-4 flex items-center before:content-[' '] before:w-[2px] before:bg-blue before:h-[18px] before:inline-block before:mr-[8px]">참여방법</h5>
    //         <p className="mb-4 text-lg leading-[140%]">
    //           챌린지 신청 ⇒ (결제 확인 후) 챌린지 성공에 필요한 물품 배송(북금곰 교통카드, 에코백) ⇒ 챌린지 인증(Instargram 게시글(태그에 ‘13.7챌린지’ 포함) 업로드 후 인증페이지에 url 붙여넣기) ⇒ 챌린지에 성공하면 인증서와 선물을 드립니다. <br />
    //           지구온도를 낮추기 위한 챌린지에 참여해주세요:)
    //         </p>
    //         <p className="mb-4 text-nagative text-sm">*반드시 인증사진과 해시태그에 ‘#13.7챌린지’가 포함 돼 있어야 합니다.</p>
    //         <Button btnType="primary" size="large" buttonStyle="mx-[auto] mt-20">
    //           참여하기
    //         </Button>
    //       </div>
    //     </SingleLayout>
  );
}
