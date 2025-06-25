export async function sendWebhook(message: string, color: number) : Promise<boolean> {
  const webhookURL = process.env.WEBHOOK_URL;
  if (!webhookURL) return false;

  const payload = {
    content: "<@776551180444631041>",
    tts: false,
    embeds: [
      {
        id: 10674342,
        title: "Status",
        description: message,
        color: color,
        fields: [],
      },
    ],
    components: [],
    actions: {},
    flags: 0,
  };

  await fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return true;
}