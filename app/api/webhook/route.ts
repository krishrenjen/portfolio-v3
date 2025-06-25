import { NextRequest, NextResponse } from 'next/server';
import { revalidateAllTags } from '@/lib/revalidate';
import { sendWebhook } from '@/lib/webhook';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const eventType = req.headers.get('x-github-event');

  if (!eventType || !['push', 'page_build'].includes(eventType)) {
    return NextResponse.json({ message: 'Unsupported GitHub event' }, { status: 400 });
  }

  const messages = {
    start: {
      msg: 'GitHub Pages site is starting to be built.',
      color: 16776192,
    },
    complete: {
      msg: 'GitHub Pages site finished building.',
      color: 65305,
    },
    revalidate: {
      msg: 'Data revalidation completed via GitHub webhook.',
      color: 6655,
    },
  };

  try {
    if (eventType === 'push') {
      const { msg, color } = messages.start;
      await sendWebhook(msg, color);
      return NextResponse.json({ message: 'Start webhook sent (push event)' });
    }

    if (eventType === 'page_build') {
      const { msg: completeMsg, color: completeColor } = messages.complete;
      await sendWebhook(completeMsg, completeColor);

      const tags = await revalidateAllTags();

      const { msg: revalMsg, color: revalColor } = messages.revalidate;
      await sendWebhook(revalMsg, revalColor);

      return NextResponse.json({
        message: 'Build complete and revalidation triggered',
        tags,
      });
    }
  } catch (error) {
    console.error('Error handling GitHub webhook:', error);
    return NextResponse.json({ message: 'Webhook handling failed' }, { status: 500 });
  }
}
