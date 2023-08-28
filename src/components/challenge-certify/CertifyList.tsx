'use client';
import React, { useEffect, useState } from 'react';

import { supabase } from '../../../supabase/supabaseConfig';

export function CertifyList() {
  const [reviews, setReviews] = useState<ChallengeReviews[]>([]);

  const loadChallengeReviews = async () => {
    let { data: reviews } = await supabase.from('reviews').select(`*, mainChallenge (title)`);
    console.log('Reviews:', reviews);

    if (reviews) {
      setReviews(reviews);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadChallengeReviews();
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex">
        {reviews?.map(item => (
          <div key={item.id} className="box-content border-4 m-1 p-2">
            <div>제목: {item.mainChallenge.title}</div>
            <div>
              게시글URL: {item.insta_url.slice(0, 30)}
              {item.insta_url.length > 30 ? '...' : ''}
            </div>
            <div>생성일: {item.created_at.toString().slice(0, 10)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

type ChallengeReviews = {
  mainChallenge: any;
  id: string;
  created_at: number;
  insta_url: string;
};
