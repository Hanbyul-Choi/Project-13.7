
import { getNatureStory } from '@/app/api/nature-story';

import ContentCard from './ContentCard';
export async function Content({ searchParams }: { searchParams: string | undefined }) {
  const data = await getNatureStory();
  return (
    <section className="flex flex-col items-center">
      <article className="grid grid-cols-3 gap-6">
        {
          searchParams === "all" ? data.map((item, i) => (
            <ContentCard key={item.post_id} data={item} index={i} />
          )) :
            data.filter(item => item.category === searchParams).map((item, i) => (
              <ContentCard key={item.post_id} data={item} index={i} />
            ))
        }

      </article>
    </section>
  );
}





