import Link from 'next/link';

import { Button } from '../common';

export function Content() {
  const data = MockData;
  return (
    <section className="flex flex-col items-center">
      <article className="grid grid-cols-3 gap-6">
        {data.map((item, index) => (
          <Link href={`/nature-story/${item.id}`} key={item.id} className="flex flex-col gap-4">
            <div className="w-[316px] h-[178px] bg-sub3 text-center"> 이미지 영역</div>
            <div className="flex gap-2  opacity-50 items-center mt-4">
              <p className="text-lg">{item.category}</p>
              <p className="text-lg">|</p>
              <p>{new Date(item.date).toLocaleDateString()}</p>
            </div>
            <h5 className="text-ellipsis overflow-hidden whitespace-nowrap">{item.title}</h5>
            <div className="flex gap-2">
              {item.tags.split(' ').map((tag, i) => (
                <p className={`text-lg ${i === 0 ? (index % 2 == 0 ? 'text-blue' : 'text-orange') : 'opacity-50'}`} key={tag}>
                  #{tag}
                </p>
              ))}
            </div>
          </Link>
        ))}
      </article>
      <Button btnType="borderBlack" size="large" rounded buttonStyle="w-fit my-20">
        더보기
      </Button>
    </section>
  );
}

const MockData = [
  {
    id: 1,
    url: 'adadad',
    category: 'YOUTUBE',
    date: Date.now(),
    title: '[자막뉴스] 북극곰은 몇 마리? 드론 개체수 조사 최초 공개 줄이기',
    content: null,
    tags: '해시태그1 해시태그2',
  },
  {
    id: 2,
    url: 'adadad',
    category: 'COLUMN',
    date: Date.now(),
    title: '[자막뉴스] 북극곰은 몇 마리? 드론 개체수 조사 최초 공개 줄이기',
    content: null,
    tags: '해시태그1 해시태그2',
  },
  {
    id: 3,
    url: 'adadad',
    category: 'NEWS',
    date: Date.now(),
    title: '[자막뉴스] 북극곰은 몇 마리? 드론 개체수 조사 최초 공개 줄이기',
    content: null,
    tags: '해시태그1 해시태그2',
  },
];
