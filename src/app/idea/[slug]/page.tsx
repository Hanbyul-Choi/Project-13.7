'use client';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { BarLoader } from 'react-spinners';

import { getSuggestions } from '@/app/api/challenge-idea';
import { CHALLENGE_SUGGESTION } from '@/app/shared/queries.keys';
import ListButton from '@/components/common/ListButton';
import IdeaDetail from '@/components/idea-detail-page/detail/IdeaDetail';
import Review from '@/components/idea-detail-page/review/Review';
import SingleLayout from '@/components/layout/SingleLayout';

import type { Props } from '@/types/page-props.type';

export interface DetailProps {
  slug: string;
}

export default function Page({ params: { slug } }: Props) {
  const { data } = useQuery([CHALLENGE_SUGGESTION], getSuggestions);

  if (!data) {
    return (
      <div className="absolute top-[50%] left-[50%] -translate-x-center -translate-y-center">
        <BarLoader color="#101828" height={5} width={200} />
      </div>
    );
  }

  const filteredData = data.find(idea => idea.post_id === slug);

  return (
    <SingleLayout title="챌린지 응원하기🙌" size>
      {filteredData ? <IdeaDetail item={filteredData} /> : null}
      <Review slug={slug} />
      <ListButton href="/idea" />
    </SingleLayout>
  );
}
