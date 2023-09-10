import IdeaContentsPost from '@/components/idea-post-page/IdeaContentsPost';
import SingleLayout from '@/components/layout/SingleLayout';

export default function IdeaPostPage() {
  return (
    <SingleLayout size={true} title="챌린지 제안하기🙌">
      <IdeaContentsPost />
    </SingleLayout>
  );
}
