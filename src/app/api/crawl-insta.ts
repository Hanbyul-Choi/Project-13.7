import axios from 'axios';
import cheerio from 'cheerio';

interface InstagramPost {
  imageUrl: string;
  caption: string;
  hashtags: string[] | null
}


export async function crawlInstagramPost(url: string): Promise<InstagramPost | null> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const imageUrl = $('meta[property="og:image"]').attr('content') || '';
    const caption = $('meta[property="og:description"]').attr('content') || '';
    const hashtags = caption.match(/#[\p{L}\p{N}_]+/gu)

    return {
      imageUrl,
      caption,
      hashtags,
    };
  } catch (error) {
    console.error('Error while crawling:', error);
    return null;
  }
}
//저장할 때 크롤링 해와서 저장
  // const [embedCode, setEmbedCode] = useState<string | null>(null);

  // useEffect(() => {
  //   const postUrl = 'https://www.instagram.com/p/ABC123DEF456/';

  //   async function fetchInstagramEmbed() {
  //     try {
  //       const oEmbedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(postUrl)}`;
  //       const response = await fetch(oEmbedUrl);
  //       const data = await response.json();
  //       setEmbedCode(data.html);
  //     } catch (error) {
  //       console.error('Error fetching Instagram embed:', error);
  //     }
  //   }

  //   fetchInstagramEmbed();
  // }, []);

    // const postUrl = 'https://www.instagram.com/p/CwheANkLXsN/';

  // crawlInstagramPost(postUrl)
  //   .then(post => {
  //     if (post) {

  //       console.log('Image URL:', post.imageUrl);
  //       console.log('Caption:', post.caption);
  //       console.log('Hashtags:', post.hashtags);
  //     } else {
  //       console.log('Failed to crawl post.');
  //     }
  //   })
  //   .catch(err => {
  //     console.error('Error:', err);
  //   });

