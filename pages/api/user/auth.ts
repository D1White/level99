import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import apiHandler from 'utils/api/api-handler';

import users from 'data/users.json';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      return res.status(401).end();
    }

    const token = jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({
      id: user.id,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      token,
    });
  } else {
    return res.status(405).end(`Method ${req.method} not allowed`);
  }
};

export default handler;
