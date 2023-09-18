import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import type { NextRequest } from 'next/server';
const secret = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret });
  if (!session) {
    return NextResponse.redirect(new URL('/', req.url));
  }
}

export const config = {
  matcher: ['/mypage'],
};
