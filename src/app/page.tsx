import MainBanner from '@/components/main/MainBanner';
import Ranking from '@/components/main/Ranking';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <MainBanner />
      <Ranking />
    </div>
  );
}
