import React from 'react';

import type { CertifyType } from '@/types/db.type';



interface CertifyCardTestProps {
  post: CertifyType;
}

const CertifyCardTest: React.FC<CertifyCardTestProps> = ({ post }) => {
  return (
    <div className="my-masonry-grid_column max-h-[600px] relative group" >
      <img src={post.img_url} alt="" className="w-full h-auto rounded-lg mb-4 hover:scale-110" />
      <h1 className="z-2 absolute -top-1 left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">aaaaaaa</h1>
    </div>
  );
};

export default CertifyCardTest;


/// post_id: 144,
// created_at: '2023-08-31T12:44:22.023587+09:00',
// challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
// insta_url:
//   'https://www.instagram.com/p/Cwl8ndBvqUs/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
// user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
// img_url:
//   'https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/371738366_1529251244486561_2636125769168341213_n.jpg?stp=c122.0.367.367a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=523iQyxnyrAAX_FRkHc&_nc_ht=scontent-ssn1-1.cdninstagram.com&oh=00_AfAWH0uaQ1YPLgHWZsPk1z7_pEXQqhXxpyBY83CMY3qWKA&oe=64F4DD90',
// tags: '["#챌린지","#13"]',
// mainChallenge: { title: '대중교통 이용하기' }



