import React from 'react';

// import type { CertifyType } from '@/types/db.type';
import Link from 'next/link';

import type { Tables } from '@/types/supabase.type';

type CertifyCardProps = {
  post: Tables<'reviews'>;
};

const CertifyCard = ({ post }: CertifyCardProps) => {
  return (
    <div className=" my-masonry-grid-column max-h-[600px] relative group overflow-hidden hover:scale-105">
      <Link href={post.insta_url}>
        <img src={post.img_url ?? ''} alt="" className="rounded-lg object-fit" />
        <div className="flex z-10 w-full bg-white absolute bottom-0 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-70 transition duration-500 ease-in-out">
          <h2 className="text-lg">{(post as any).users.nickname}</h2>
          &nbsp;
          <span>|</span>
          &nbsp;
          <h1 className="text-lg">{post.created_at.toString().slice(0, 10)}</h1>
        </div>
      </Link>
    </div>
  );
};

export default CertifyCard;
