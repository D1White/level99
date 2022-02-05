import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import serverDelay from 'utils/serverDelay';

function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const arrSize = Math.floor(Math.random() * (8 - 4 + 1) + 4);

  const data = new Array(arrSize).fill(null).map((_, idx) => {
    return {
      name: `Page ${idx + 1}`,
      value: Math.floor(Math.random() * (5000 - 1000 + 1) + 1000),
    };
  });

  res.status(200).json(data);
}

export default handler;
