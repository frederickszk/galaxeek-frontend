// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    // TODO: In the original project, this is used to control the access. While we just overlook it.
    // This api in fact do nothing.
    // access = ''
    res.status(200).send({});
  },
};
