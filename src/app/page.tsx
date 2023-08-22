import Layout from '@/components/common/Layout';
import MainBanner from '@/components/mainPage/MainBanner';
import Ranking from '@/components/mainPage/Ranking';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MainBanner />
      <Layout>
        <Ranking />
      </Layout>
    </div>
  );
}
