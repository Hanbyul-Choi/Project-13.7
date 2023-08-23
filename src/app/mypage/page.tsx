import React from 'react';

import type { Props } from '@/types/PropsType';

export default function Page({ params: { slug } }: Props) {
  return <div>{slug}</div>;
}
