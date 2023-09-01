import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse } from 'next/server';

import type { NextRequest} from 'next/server';
export const dynamic = 'force-dynamic';
export const getHtml = async (url : string) => {
  try {
    const html = await axios.get(url);
    const $ = cheerio.load(html.data);
    const imageUrl:string  = $('meta[property="og:image"]').attr('content') || '';
    const caption = $('meta[property="og:description"]').attr('content') || '';
    const hashtags: string[] | null = caption.match(/#[\p{L}\p{N}_]+/gu)

    return {
      imageUrl,
      hashtags,
    };
  }
  catch(error){
    console.error("Error while crawling", error);
  }
}

export async function GET (
  request: NextRequest,
  response: NextResponse
) {
  const url = request.url.split("=")[1]
  if (!url || typeof url !== 'string') {
    const myRes = new Response("res", {status: 500})
    return myRes
  }
  const article = await getHtml(url);
  if (article === null) {
    response.status
  } else {
      return NextResponse.json({res:article})
    }
}

