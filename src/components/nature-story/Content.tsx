
import ContentCard from './ContentCard';
import { Button } from '../common';

export function Content() {
  const data = MockData;
  return (
    <section className="flex flex-col items-center">
      <article className="grid grid-cols-3 gap-6">
        {data.map((item, i) => (
          <ContentCard key={item.post_id} data={item} index={i} />
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
    post_id: '1',
    img_url: 'adadad',
    category: 'YOUTUBE',
    created_at: "2023-9-9",
    title: '[자막뉴스] 북극곰은 몇 마리? 드론 개체수 조사 최초 공개 줄이기',
    content: '',
    video_url: '',
    tag: '해시태그1 해시태그2',
  },
  {
    post_id: '2',
    img_url: 'adadad',
    category: 'YOUTUBE',
    created_at: "2023-9-9",
    title: '[자막뉴스] 북극곰은 몇 마리? 드론 개체수 조사 최초 공개 줄이기',
    content: '',
    video_url: '',
    tag: '해시태그1 해시태그2',
  },
  {
    post_id: '3',
    img_url: 'adadad',
    category: 'YOUTUBE',
    created_at: "2023-9-9",
    title: '[자막뉴스] 북극곰은 몇 마리? 드론 개체수 조사 최초 공개 줄이기',
    content: '',
    video_url: '',
    tag: '해시태그1 해시태그2',
  },
];
