'use client'
import React from 'react';

import Masonry from 'react-masonry-css';

import CertifyCardTest from './CertifyCardTest';
import { Layout } from '../common';

import type { CertifyType } from '@/types/db.type';

import './index.css'




const posts: CertifyType[] = [
  {
    post_id: 144,
    created_at: '2023-08-31T12:44:22.023587+09:00',
    challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
    insta_url:
      'https://www.instagram.com/p/Cwl8ndBvqUs/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
    user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
    img_url:
      'https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg',
    tags: '["#챌린지","#13"]',
    mainChallenge: { title: '대중교통 이용하기' }
  },
  {
    post_id: 143,
    created_at: '2023-08-31T12:18:58.765809+09:00',
    challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
    insta_url: 'https://www.instagram.com/p/Cwl8ndBvqUs/',
    user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
    img_url:
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/371738366_1529251244486561_2636125769168341213_n.jpg?stp=c122.0.367.367a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=523iQyxnyrAAX_FRkHc&_nc_ht=scontent-ssn1-1.cdninstagram.com&oh=00_AfAWH0uaQ1YPLgHWZsPk1z7_pEXQqhXxpyBY83CMY3qWKA&oe=64F4DD90',
    tags: '["#챌린지"]',
    mainChallenge: { title: '대중교통 이용하기' }
  },
  {
    post_id: 144,
    created_at: '2023-08-31T12:44:22.023587+09:00',
    challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
    insta_url:
      'https://www.instagram.com/p/Cwl8ndBvqUs/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
    user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
    img_url:
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/371738366_1529251244486561_2636125769168341213_n.jpg?stp=c122.0.367.367a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=523iQyxnyrAAX_FRkHc&_nc_ht=scontent-ssn1-1.cdninstagram.com&oh=00_AfAWH0uaQ1YPLgHWZsPk1z7_pEXQqhXxpyBY83CMY3qWKA&oe=64F4DD90',
    tags: '["#챌린지","#13"]',
    mainChallenge: { title: '대중교통 이용하기' }
  },
  {
    post_id: 143,
    created_at: '2023-08-31T12:18:58.765809+09:00',
    challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
    insta_url: 'https://www.instagram.com/p/Cwl8ndBvqUs/',
    user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
    img_url:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MjhfMjE2%2FMDAxNjg3OTEzODUzNzQ4.Kb9f4_LnTkRrIJbj523RcPk5gY3F4ObNmR4aNrNpWPQg.of0eVKaDOUD8x_j9W6N2Yrr3SJi0aGVkibVOB4AiK4kg.JPEG.ag_mj%2F1687913852423.jpg&type=sc960_832',
    tags: '["#챌린지"]',
    mainChallenge: { title: '대중교통 이용하기' }
  },
  {
    post_id: 144,
    created_at: '2023-08-31T12:44:22.023587+09:00',
    challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
    insta_url:
      'https://www.instagram.com/p/Cwl8ndBvqUs/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==',
    user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
    img_url:
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/371738366_1529251244486561_2636125769168341213_n.jpg?stp=c122.0.367.367a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=523iQyxnyrAAX_FRkHc&_nc_ht=scontent-ssn1-1.cdninstagram.com&oh=00_AfAWH0uaQ1YPLgHWZsPk1z7_pEXQqhXxpyBY83CMY3qWKA&oe=64F4DD90',
    tags: '["#챌린지","#13"]',
    mainChallenge: { title: '대중교통 이용하기' }
  },
  {
    post_id: 143,
    created_at: '2023-08-31T12:18:58.765809+09:00',
    challenge_id: '475b6a2f-c38f-4c26-a754-f73ba9d4b0cb',
    insta_url: 'https://www.instagram.com/p/Cwl8ndBvqUs/',
    user_id: '4bee4f59-800b-46b4-830f-b8c210952efa',
    img_url:
      'https://scontent-ssn1-1.cdninstagram.com/v/t51.29350-15/371738366_1529251244486561_2636125769168341213_n.jpg?stp=c122.0.367.367a_dst-jpg_s640x640&_nc_cat=100&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=523iQyxnyrAAX_FRkHc&_nc_ht=scontent-ssn1-1.cdninstagram.com&oh=00_AfAWH0uaQ1YPLgHWZsPk1z7_pEXQqhXxpyBY83CMY3qWKA&oe=64F4DD90',
    tags: '["#챌린지"]',
    mainChallenge: { title: '대중교통 이용하기' }
  }
];

const CertifyListTest: React.FC = () => {
  return (
    <Layout>
      <div>
        <Masonry
          breakpointCols={{
            default: 4
          }}
          className="my-masonry-grid "
          columnClassName="my-masonry-grid_column "
        >
          {posts.map((post, index) => (
            <CertifyCardTest key={index} post={post} />
          ))}
        </Masonry>
      </div>
    </Layout>
  );
};

export default CertifyListTest;