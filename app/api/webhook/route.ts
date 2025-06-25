import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  const webhookURL = process.env.WEBHOOK_URL;

  if (!webhookURL) {
    return NextResponse.json({ message: 'Webhook URL not configured' }, { status: 500 });
  }

  // check request params, either start or complete
  const action = req.nextUrl.searchParams.get('action');
  if (!action || (action !== 'start' && action !== 'complete')) {
    return NextResponse.json({ message: 'Invalid action parameter' }, { status: 400 });
  }

  const payload_start = {
    "content": "<@776551180444631041>",
    "tts": false,
    "embeds": [
      {
        "id": 10674342,
        "title": "Status",
        "description": "GitHub Pages site is starting to be built.",
        "color": 16776192,
        "fields": []
      }
    ],
    "components": [],
    "actions": {},
    "flags": 0
  }

  const payload_complete = {
    "content": "<@776551180444631041>",
    "tts": false,
    "embeds": [
      {
        "id": 10674342,
        "title": "Status",
        "description": "GitHub Pages site finished building.",
        "color": 65305,
        "fields": []
      }
    ],
    "components": [],
    "actions": {},
    "flags": 0
  }

  const payload = action === 'start' ? payload_start : payload_complete;

  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return NextResponse.json({ message: 'Webhook triggered successfully', action });
  } catch (error) {
    console.error('Error triggering webhook:', error);
    return NextResponse.json({ message: 'Error triggering webhook' }, { status: 500 });
  }
  
}
