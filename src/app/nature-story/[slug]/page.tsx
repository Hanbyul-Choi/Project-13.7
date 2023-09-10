
import { Layout } from '@/components/common';
import NatureDetail from '@/components/nature-story-detail/NatureDetail';

import type { Props } from '@/types/page-props.type';

export default function Page({ params: { slug } }: Props) {

  return (
    <Layout>
      <NatureDetail postId={slug} />
    </Layout>
  )
}