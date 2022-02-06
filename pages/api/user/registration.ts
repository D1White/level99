import type { NextApiRequest, NextApiResponse } from 'next';

import supabase from 'utils/supabase';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (!name && !email && !password) {
      res.status(400).end();
    }

    const newUser = {
      email,
      password,
      name,
    };

    const { data, error } = await supabase.from('user').insert(newUser);

    if (error) {
      res.status(405).json(JSON.stringify(error));
    }

    res.status(201).json(data);
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
