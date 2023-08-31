
/*
export async function crawlInstagramPost(url: string): Promise<InstagramPostData | null> {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('.x1yvgwvq');

    const imageUrl = await page.$eval('meta[property="og:image"]', element => element.getAttribute('content'));
    const caption = await page.$eval('meta[property="og:description"]', element => element.getAttribute('content'));

    await browser.close();

    return {
      imageUrl: imageUrl || '',
      caption: caption || '',
    };
  } catch (error) {
    console.error('Error while crawling:', error);
    return null;
  }
}*/
/* 
export default async function handler(req: any, res: any) {
  const postUrl = 'https://www.instagram.com/p/CwelXSjN3_p/';
  const post = await crawlInstagramPost(postUrl);
  res.json(post);
}
/*/
// cheerio사용
import axios from 'axios';
import cheerio from 'cheerio';

interface InstagramPost {
  imageUrl: string;
  hashtags: string[] |null;
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
      hashtags,
    };
  } catch (error) {
    console.error('Error while crawling:', error);
    return null;
  }
}

