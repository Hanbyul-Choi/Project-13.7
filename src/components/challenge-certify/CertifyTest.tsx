import React from 'react'

import { crawlInstagramPost } from '@/app/api/crawl-insta';

export default function CertifyTest() {
  const postUrl = 'https://www.instagram.com/p/CwheANkLXsN/';
  crawlInstagramPost(postUrl)
    .then(post => {
      if (post) {
        console.log('Image URL:', post.imageUrl);
        console.log('Hashtags:', post.hashtags);
      } else {
        console.log('Failed to crawl post.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
    });
  return (
    <div>CertifyTest</div>
  )
}



