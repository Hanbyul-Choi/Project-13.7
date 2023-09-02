'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SideBar() {
  const params = usePathname();
  return (
    <nav className="flex flex-col justify-start items-center w-[180px]">
      <Link href="/naturestory" className="px-6 py-4">
        <h5 className={`${params === '/naturestory' ? '' : 'text-lg font-medium opacity-50'}`}>전체보기</h5>
      </Link>
      <Link href="/naturestory/youtube" className="px-6 py-4">
        <h5 className={`${params === '/naturestory/youtube' ? '' : 'text-lg font-medium opacity-50'}`}>유튜브</h5>
      </Link>
      <Link href="/naturestory/column" className="px-6 py-4">
        <h5 className={`${params === '/naturestory/column' ? '' : 'text-lg font-medium opacity-50'}`}>칼럼</h5>
      </Link>
      <Link href="/naturestory/news" className="px-6 py-4">
        <h5 className={`${params === '/naturestory/news' ? '' : 'text-lg font-medium opacity-50'}`}>뉴스</h5>
      </Link>
    </nav>
  );
}
