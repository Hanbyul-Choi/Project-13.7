import React from 'react';

import IdeaDetail from '@/components/idea-detail-page/IdeaDetail';
import Review from '@/components/idea-detail-page/Review';
import SingleLayout from '@/components/layout/SingleLayout';

import type { Props } from '@/types/Props.type';
export interface DetailProps {
  slug: string;
}

export default function page({ params: { slug } }: Props) {
  return (
    <SingleLayout title="챌린지 응원하기🙌" size={true}>
      <IdeaDetail slug={slug} />
      <Review slug={slug} />
    </SingleLayout>
  );
}
