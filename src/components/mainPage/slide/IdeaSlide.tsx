import React from 'react'

import Slide from './Slide';


const data = [
  {
    post_id: "1",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    user_id: "1",
    selected: false,
    commends: 0,
    img_url: "a",
  },
  {
    post_id: "2",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    user_id: "1",
    selected: false,
    commends: 0,
    img_url: "a",
  },
  {
    post_id: "3",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    user_id: "1",
    selected: false,
    commends: 0,
    img_url: "a",
  },
  {
    post_id: "4",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    user_id: "1",
    selected: false,
    commends: 0,
    img_url: "a",
  },
  {
    post_id: "5",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    user_id: "1",
    selected: false,
    commends: 0,
    img_url: "",
  },
];
export default function IdeaSlide() {

  return (
    <div className="border-b-2 mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Next Challenge</p>
      <div className='flex justify-between'>
        <h2 className="mt-4">다음 챌린지 투표하기</h2>

      </div>
      <div className={'mt-10'}>
        <Slide showContentNum={3} type='idea' contents={data}></Slide>
      </div>
    </div>
  )
}
