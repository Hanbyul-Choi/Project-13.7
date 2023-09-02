import { Layout } from '@/components/common';
import MainBanner from '@/components/mainPage/MainBanner';
import Ranking from '@/components/mainPage/Ranking';
import ColumnSlide from '@/components/mainPage/slide/ColumnSlide';
import IdeaSlide from '@/components/mainPage/slide/IdeaSlide';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MainBanner />
      <Layout>
        <Ranking />
        <IdeaSlide />
        <ColumnSlide />
      </Layout>
    </div>
  );
}
