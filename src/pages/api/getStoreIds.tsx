import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      'https://search-app.microcms.io/api/v1/store?fields=id',
      {
        headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY },
      }
    );

    const contents = response.data.contents;
    res.status(200).json(contents);
  } catch (err) {
    console.error('error:', err);
    res.status(500).json({ message: 'Failed' });
  }
}
