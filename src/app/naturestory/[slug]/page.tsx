import React from 'react';

import type { Props } from '@/types/page-props.type';

export default function page({ params: { slug } }: Props) {
  return <div>NatureStory {slug} Detail</div>;
}
