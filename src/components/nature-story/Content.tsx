import { getNatureStory } from '@/app/api/nature-story';

import ContentCard from './ContentCard';
export async function Content({ searchParams }: { searchParams: string | undefined }) {
  const data = await getNatureStory();
  const filterdData = data.filter(item => item.category === searchParams)
  return (
    <section className="flex flex-col items-center p-2 min-h-[300px]">
      <article className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-4 lg:grid-cols-3 ">
        {searchParams === 'all'
          ? data.map((item, i) => <ContentCard key={item.post_id} data={item} index={i} />)
          : filterdData.map((item, i) => <ContentCard key={item.post_id} data={item} index={i} />)
        }
        {
          (searchParams !== 'all') && filterdData.length == 0 ? (
            <p className='mt-2 ml-7'>아직 작성된 글이 없습니다</p>
          ) : null
        }
      </article>
    </section>
  );
}
