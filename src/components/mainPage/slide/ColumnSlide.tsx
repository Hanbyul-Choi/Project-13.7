import React from 'react';

export default function ContentSlide() {
  return (
    <div className=" border-b-2 mt-20 pb-20">
      <p className="text-xl opacity-50 underline underline-offset-4 font-montserrat">Contents</p>
      <h2 className="mt-4">멸종위기 동물들의 생활</h2>
      <div className={'flex items-center mt-10 gap-x-6'}>{/* <Slide showContentNum={4} type="column" contents={data}></Slide> */}</div>
    </div>
  );
}
