import React from 'react';

function Banner({ challenge, title }: { challenge: string; title: string }) {
  return (
    <div className={`float-left w-full md:h-[400px] h-[300px] bg-[#white] mb-6 flex flex-col justify-center`}>
      <p className="text-[40px] uppercase font-montserrat font-bold italic leading-[130%] flex flex-col mb-[88px]">
        save this planet,
        <span className="text-white " style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
          let&#39;s act with us!
        </span>
      </p>
      <div className="flex">
        <p className="uppercase font-montserrat text-[18px] leading-[18px] w-[203px] h-[42px] bg-black text-white flex items-center justify-center">
          {challenge}
        </p>
        <p className="text-[36px] leading-[130%] font-bold ml-[16px]">{title}</p>
      </div>
    </div>
  );
}

export default Banner;
