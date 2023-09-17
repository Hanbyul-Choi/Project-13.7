import { NextResponse } from 'next/server';

import { supabase } from '../../../../supabase/supabaseConfig';
export const revalidate = 20

export async function GET(): Promise<any> { 
  const { data } = await supabase.from('natureStory').select(`*`);
  if (!data) {
    const noRes = new Response('res', { status: 500 });
    return noRes;
  }
  else {
    return NextResponse.json({ res: data });
  }
}