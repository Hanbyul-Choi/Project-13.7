import Link from 'next/link';

export function SideBar({ searchParams }: { searchParams: string | undefined }) {
  return (
    <nav className="flex flex-col justify-start items-center min-w-32">
      {categories.map(item => (
        <Link href={`/nature-story/?category=${item.path}`} key={item.title} className="px-6 py-4 whitespace-nowrap text-center w-full">
          <h5 className={`${searchParams === item.path ? '' : 'text-lg font-medium opacity-50 w-[4.125rem]'}`}>{item.title}</h5>
        </Link>
      ))}
    </nav>
  );
}

const categories = [
  {
    title: '전체보기',
    path: 'all',
  },
  {
    title: '유튜브',
    path: 'youtube',
  },
  {
    title: '칼럼',
    path: 'column',
  },
  {
    title: '뉴스',
    path: 'news',
  },
];
