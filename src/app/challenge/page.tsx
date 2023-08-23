import React from 'react';

import Slide from '@/components/mainPage/slide/Slide';


export interface Suggestion {
  post_id: string;
  created_at: string;
  title: string;
  content: string;
  product: string;
  userid: string;
  selected: boolean;
  commends: number;
}
const data = [
  {
    post_id: "1",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    userid: "1",
    selected: false,
    commends: 0,
  },
  {
    post_id: "2",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    userid: "1",
    selected: false,
    commends: 0,
  },
  {
    post_id: "3",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    userid: "1",
    selected: false,
    commends: 0,
  },
  {
    post_id: "4",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    userid: "1",
    selected: false,
    commends: 0,
  },
  {
    post_id: "5",
    created_at: "2021.08.18",
    title: 'hannah.G',
    content: '북극곰 마스터',
    product: "aa",
    userid: "1",
    selected: false,
    commends: 0,
  },
];


export default function ChallengePage() {
  return <Slide showContentNum={3} space={10} contents={data} contentWidth={200} />;
}
