import React from 'react';

type Props = {
  params: {
    slug: string;
  };
};

export default function page({ params: { slug } }: Props) {
  return <div>{slug}My Page</div>;
}
