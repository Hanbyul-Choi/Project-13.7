import { Layout } from '@/components/common';
import MainBanner from '@/components/main-page/MainBanner';
import Ranking from '@/components/main-page/Ranking';
import ColumnSlide from '@/components/main-page/slide/ColumnSlide';
import IdeaSlide from '@/components/main-page/slide/IdeaSlide';
import TotalTreeNumber from '@/components/main-page/TotalTreeNumber';

import { getNatureStory } from './api/nature-story';

import type { Tables } from '@/types/supabase.type';



export default async function Main() {
  const natureStory: Tables<'natureStory'>[] = await getNatureStory()
  return (
    <div className="flex flex-col justify-center items-center">
      <TotalTreeNumber />
      <MainBanner />
      <Layout>
        <Ranking />
        <IdeaSlide />
        <ColumnSlide natureStory={natureStory} />
      </Layout>
    </div>
  );
}
