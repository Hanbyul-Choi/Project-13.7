import axios from 'axios';
import cheerio from 'cheerio';

export const getHtml = async (url: string): Promise<{ imageUrl: string; hashtags: string[] | null } | undefined> => {
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const imageUrl: string = $('meta[property="og:image"]').attr('content') || '';
    const caption = $('meta[property="og:description"]').attr('content') || '';
    const hashtags: string[] | null = caption.match(/#[\p{L}\p{N}_\.]+/gu);

    return {
      imageUrl,
      hashtags,
    };
  } catch (error) {
    console.error('Error while crawling', error);
  }
};
