import React from 'react';

const data = [
  {
    post_id: '1',
    created_at: '2021.08.18',
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: 'aa',
    user_id: '1',
    selected: false,
    likes: 0,
    img_url: 'a',
    users: {},
  },
  {
    post_id: '2',
    created_at: '2021.08.18',
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: 'aa',
    user_id: '1',
    selected: false,
    likes: 0,
    img_url: 'a',
    users: {},
  },
  {
    post_id: '3',
    created_at: '2021.08.18',
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: 'aa',
    user_id: '1',
    selected: false,
    likes: 0,
    img_url: 'a',
    users: {},
  },
  {
    post_id: '4',
    created_at: '2021.08.18',
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: 'aa',
    user_id: '1',
    selected: false,
    likes: 0,
    img_url: 'a',
    users: {},
  },
  {
    post_id: '5',
    created_at: '2021.08.18',
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: 'aa',
    user_id: '1',
    selected: false,
    likes: 0,
    img_url: '',
    users: {},
  },
];
export default function ContentSlide() {
  console.log(data);
  return (
    <div className=" border-b-2 mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Contents</p>
      <h2 className="mt-4">멸종위기 동물들의 생활</h2>
      <div className={'flex items-center mt-10 gap-x-6'}>{/* <Slide showContentNum={4} type="column" contents={data}></Slide> */}</div>
    </div>
  );
}
