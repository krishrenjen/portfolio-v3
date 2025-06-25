import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

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

    const webhookURL = process.env.WEBHOOK_URL;
    if(webhookURL){
      const payload = {
        content: "<@776551180444631041>",
        tts: false,
        embeds: [
          {
            id: 10674342,
            title: "Status",
            description: "Data revalidation completed successfully.",
            color: 6655,
            fields: []
          }
        ],
        components: [],
        actions: {},
        flags: 0
      };

      await fetch(webhookURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ revalidated: true, tags });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ message: 'Error during revalidation' }, { status: 500 });
  }
}
