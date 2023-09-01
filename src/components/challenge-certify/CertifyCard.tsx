import React from 'react';

import type { CertifyType } from '@/types/db.type';
interface CertifyCardProps {
  post: CertifyType;
}

const CertifyCard: React.FC<CertifyCardProps> = ({ post }: CertifyCardProps) => {
  return (
    <div className=" my-masonry-grid-column max-h-[600px] relative group overflow-hidden hover:scale-105">
      <img src={post.img_url} alt="" className="rounded-lg object-fit" />
      <div className="flex z-10 w-full bg-white absolute bottom-0 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-70 transition duration-500 ease-in-out">
        <h2 className='text-lg'>{post.users.nickname}</h2>
        &nbsp;
        <span>|</span>
        &nbsp;
        <h1 className='text-lg'>{post.created_at.toString().slice(0, 10)}</h1>
      </div>
    </div>
  );
};

export default CertifyCard;