import getDailyProps from '../../../lib/dailyProps';

export default async function handler(req: any, res: any) {
  const dailyProps = getDailyProps();
  if (req.method === 'GET') {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${dailyProps.apiKey}`,
      },
    };

    const dailyRes = await fetch(
      `${dailyProps.restDomain}/rooms`,
      options
    );

    const response = await dailyRes.json();
    return res.status(200).json(response);
  }

  return res.status(500);
}