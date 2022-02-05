import expressJwt from 'express-jwt';
const util = require('util');
import type { NextApiRequest, NextApiResponse } from 'next';

const jwtMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<{ req: NextApiRequest; res: NextApiResponse }> => {
  const middleware = expressJwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });

  return util.promisify(middleware)(req, res);
};

export default jwtMiddleware;
