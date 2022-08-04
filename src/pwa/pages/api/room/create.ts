import getDailyProps from '../../../lib/dailyProps';
export default async function handler(req: any, res: any) {
  const dailyProps = getDailyProps();
  if (req.method === 'POST') {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dailyProps.apiKey}`,
      },
      body: JSON.stringify({
        properties: {
          enable_prejoin_ui: true,
          enable_network_ui: true,
          enable_screenshare: true,
          enable_chat: true,
          exp: Math.round(Date.now() / 1000) + 300,
          eject_at_room_exp: true,
        },
      }),
    };

    const dailyRes = await fetch(
      `${dailyProps.restDomain}}/rooms`,
      options
    );

    const response = await dailyRes.json();

    if (response.error) {
      return res.status(500).json(response.error);
    }

    return res.status(200).json(response);
  }

  return res.status(500);
}

