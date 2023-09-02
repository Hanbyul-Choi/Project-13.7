import { NextResponse } from 'next/server';

import { getHtml } from '../getHtml';

import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<any> {
  const url: string = request.url.split('=')[1];
  if (!url || typeof url !== 'string') {
    const myRes = new Response('res', { status: 500 });
    return myRes;
  }
  const article = await getHtml(url);
  if (article === null) {
    const badRes = new Response('res', { status: 404 });
    return badRes;
  } else {
    return NextResponse.json({ res: article });
  }
}
