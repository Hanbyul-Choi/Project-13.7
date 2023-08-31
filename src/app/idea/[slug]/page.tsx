'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getSuggestions } from '@/app/api/challenge-idea';
import IdeaDetail from '@/components/idea-detail-page/IdeaDetail';
import Review from '@/components/idea-detail-page/Review';
import SingleLayout from '@/components/layout/SingleLayout';

import type { Props } from '@/types/Props.type';
export interface DetailProps {
  slug: string;
}

export default function Page({ params: { slug } }: Props) {
  const { data } = useQuery(['challengeSuggestion'], getSuggestions);

  if (!data) {
    return <div>로딩중...</div>;
  }
  const filteredData = data.find(idea => idea.post_id === slug);

  return (
    <SingleLayout title="챌린지 응원하기🙌" size={true}>
      <IdeaDetail item={filteredData} />
      <Review slug={slug} />
    </SingleLayout>
  );
}
