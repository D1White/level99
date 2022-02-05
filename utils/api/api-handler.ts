import type { NextApiRequest, NextApiResponse } from 'next';

import errorHandler from './error-handler';
import jwtMiddleware from './jwt-middleware';

const apiHandler = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await jwtMiddleware(req, res);

      await handler(req, res);
    } catch (err) {
      errorHandler(err as Error, res);
    }
  };
};

export default apiHandler;
