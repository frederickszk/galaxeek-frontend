// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST /api/rule': (req: Request, res: Response) => {
    res.status(200).send({
      key: 68,
      disabled: true,
      href: 'https://github.com/umijs/dumi',
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      name: '郑勇',
      owner: 'Lewis',
      desc: '作老府许米都看之每队院也出状正目写。',
      callNo: 62,
      status: 99,
      updatedAt: 'SBBw',
      createdAt: 'WYx]48',
      progress: 78,
    });
  },
};
