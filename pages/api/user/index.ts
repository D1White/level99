import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import apiHandler from 'utils/api/api-handler';

import { JWTUser } from 'types/User';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).end('No credentials sent!');
    }

    const token = authHeader.replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTUser;

    res.status(200).json({
      id: decoded.data.id,
      email: decoded.data.email,
      name: decoded.data.name,
    });
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default apiHandler(handler);
