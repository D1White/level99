import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

import users from 'data/users.json';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      res.status(400).end();
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1,
      email,
      password,
      name,
    };

    const allUsers = [...users, newUser];

    fs.writeFileSync('data/users.json', JSON.stringify(allUsers, null, 4));

    res.status(201).json({});
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
