import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'; // ✅ Needed for tag revalidation

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const tags = ['text', 'experience', 'projects', 'skills'];

  try {
    for (const tag of tags) {
      await revalidateTag(tag); 
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ message: 'Error during revalidation' }, { status: 500 });
  }
}
