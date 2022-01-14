// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET /api/currentUser': (req: Request, res: Response) => {
    res.status(200).send({
      name: '汤吉学',
      avatar:
        'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
      userid: 'd8cB4DdA-f3bF-7d9c-B6f8-AB42F5F4ee82',
      email: 'q.ktfgbfnl@lwus.tj',
      signature: '术该性计问象亲水科至程引保地住质。',
      title: '两然约制空置其以无细引看外型学八。',
      group: '创新科技组',
      tags: [{ key: 1, label: '名望程序员' }],
      notifyCount: 61,
      unreadCount: 89,
      country: '德国',
      access: '指着万东科料理治斯也最头说专。',
      geographic: {
        province: { label: '江西省', key: 2 },
        city: { label: '银川市', key: 3 },
      },
      address: '香港特别行政区 九龙 油尖旺区',
      phone: '11107218885',
    });
  },
};
