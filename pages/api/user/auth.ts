import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import supabase from 'utils/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const { data, error } = await supabase
      .from('user')
      .select('email, password, name, id')
      .match({ email: email, password: password });

    if (!data || error) {
      return res.status(401).end();
    }

    const token = jwt.sign({ data: data[0] }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.status(200).json({ ...data[0], token });
  } else {
    return res.status(405).end(`Method ${req.method} not allowed`);
  }
};

export default handler;
