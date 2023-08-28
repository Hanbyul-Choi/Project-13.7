import React from 'react';

import type { Props } from '@/types/Props.type';

export default function page({ params: { slug } }: Props) {
  return <div>{slug}</div>;
}
