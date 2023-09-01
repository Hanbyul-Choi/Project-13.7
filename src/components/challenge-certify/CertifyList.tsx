'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import Masonry from 'react-masonry-css';

import { loadChallengeReviews } from '@/app/api/challenge-certify';

import CertifyCard from './CertifyCard';

import './index.css'

export function CertifyList() {
  const { isError, data } = useQuery(['reviews'], loadChallengeReviews);
  if (isError) {
    return <p>Error Fetching Challenge Reviews</p>;
  }
  console.log(data)
  return (
    <>
      <div className='mt-28'>
        <Masonry
          breakpointCols={{
            default: 4
          }}
          className="my-masonry-grid "
          columnClassName="my-masonry-grid_column "
        >
          {data?.map((post, index) => (
            <CertifyCard key={index} post={post} />
          ))}
        </Masonry>
      </div>
    </>
  );
}

{/* <div className="flex">
  {data?.map(item => (
    <div key={item.id} className="box-content border-4 m-1 p-2">
      <img src={item.img_url} alt="certifyImg" style={{ objectFit: 'cover' }} />
      <div> {item.mainChallenge.title}c</div>
      <div>
        게시글URL: {item.insta_url.slice(0, 30)}
        {item.insta_url.length > 30 ? '...' : ''}
      </div>
      <div>생성일: {item.created_at.toString().slice(0, 10)}</div>
    </div>
  ))}
</div> */}

{/* {data ? (
  <>
    <div className="flex flex-col items-center gap-[7.5rem] mb-20">
      <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 mt-20 gap-x-4 gap-y-10">
        {data?.map(item => (
          <CertifyPost key={item.post_id} item={item} />
        ))}
      </div>
      <Button btnType="borderBlack" size="large" rounded onClick={clickNextPage}>
        더보기
        <AiOutlineArrowRight size={20} />
      </Button>
    </div>
  </>
) : (
  <div className="w-full h-[50vh] flex justify-center items-center ">
    <BarLoader color="#101828" height={5} width={200} />
  </div>
)} */}
