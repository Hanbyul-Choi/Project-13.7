import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { Database } from '@/types/supabase.type';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log(1);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });
  await supabase.auth.getSession();
  return res;
}
