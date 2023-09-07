import Link from 'next/link';

import type { Props } from '@/types/page-props.type';

export function SideBar({ params }: Props) {
  return (
    <nav className="flex flex-col justify-start items-center w-[180px]">
      {categories.map(item => (
        <Link href={`nature-story/${item.path}`} key={item.title} className="px-6 py-4">
          <h5 className={`${params.slug === item.path ? '' : 'text-lg font-medium opacity-50'}`}>{item.title}</h5>
        </Link>
      ))}
    </nav>
  );
}

const categories = [
  {
    title: '전체보기',
    path: '',
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
