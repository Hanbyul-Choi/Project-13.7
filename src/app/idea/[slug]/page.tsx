import React from 'react';

import type { Props } from '@/types/PropsType';

export default function page({ params: { slug } }: Props) {
  return <div>{slug} Idea Detail Page</div>;
}
