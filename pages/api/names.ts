import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IName } from 'types/Name';

function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  axios
    .get<IName[]>('https://random-data-api.com/api/name/random_name?size=100')
    .then((apiRes: AxiosResponse) => {
      let names: IName[] = [];

      new Array(10).fill(null).forEach((_) => {
        names = [...names, ...apiRes.data];
      });

      res.status(200).json(names);
    })
    .catch((err: AxiosError) => {
      res.status(err.code ? +err.code : 404).json(err.message);
    });
}

export default handler;
