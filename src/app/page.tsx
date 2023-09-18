import { Layout } from '@/components/common';
import MainBanner from '@/components/main-page/MainBanner';
import Ranking from '@/components/main-page/Ranking';
import ColumnSlide from '@/components/main-page/slide/ColumnSlide';
import IdeaSlide from '@/components/main-page/slide/IdeaSlide';
import TotalTreeNumber from '@/components/main-page/TotalTreeNumber';

export default function Main() {
  return (
    <div className="flex flex-col justify-center items-center">
      <TotalTreeNumber />
      <MainBanner />
      <Layout>
        <Ranking />
        <IdeaSlide />
        <ColumnSlide />
      </Layout>
    </div>
  );
}
