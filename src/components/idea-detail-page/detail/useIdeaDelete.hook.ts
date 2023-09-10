import { useRouter } from 'next/navigation';

import { deleteChallengeIdea } from '@/app/api/challenge-idea';
import { useDialog } from '@/components/common';

import type { Suggestion } from '@/types/db.type';

export default function useIdeaDelete(post_id: string) {
  const queryParams = new URLSearchParams();
  const { Confirm } = useDialog();
  const router = useRouter();

  const handleDeleteChallengeIdeaData = async () => {
    const confirmed = await Confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirmed) {
      deleteChallengeIdea(post_id);
      router.push(`/idea`);
    }
  };

  const handleAppendParamMovePage = (item: Suggestion, title: string, content: string, product: string, img_url: string) => {
    if (item) {
      queryParams.append('post_id', post_id);
      queryParams.append('title', title);
      queryParams.append('content', content);
      queryParams.append('product', product);
      queryParams.append('img_url', img_url);
      queryParams.append('is_edit', 'true');

      const queryString = queryParams.toString();

      router.push(`/idea/post?${queryString}`);
    }
  };

  return { handleDeleteChallengeIdeaData, handleAppendParamMovePage };
}
