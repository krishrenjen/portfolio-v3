import { NextRequest, NextResponse } from 'next/server';
import { revalidateAllTags } from '@/lib/revalidate';
import { sendWebhook } from '@/lib/webhook';


export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    const tags = await revalidateAllTags();
    await sendWebhook('Data revalidation completed successfully.', 6655);
    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    console.error('Error revalidating:', err);
    await sendWebhook('Error during data revalidation.', 16711680); // Red color for error
    return NextResponse.json({ message: 'Error during revalidation' }, { status: 500 });
  }
}
