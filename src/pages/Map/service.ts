import { request } from 'umi';
import type { Position } from './data.d';

export async function queryPositionByDevice(params: {
  device_id: number;
  history: boolean;
}): Promise<Position | Position[]> {
  return request('http://1.116.159.212:19192/api/positions', {
    method: 'GET',
    params,
  });
}
