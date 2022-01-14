import { request } from 'umi';
import type { CardListItemDataType, Device } from './data.d';

export async function queryFakeList(params: {
  count: number;
}): Promise<{ data: { list: CardListItemDataType[] } }> {
  return request('/api/card_fake_list', {
    params,
  });
}

export async function queryDeviceByUser(params: {
  user_id: number;
}): Promise<Device[]> {
  return request('http://1.116.159.212:19192/api/devices', {
    method: 'GET',
    params,
  });
}

export async function controlDeviceById(params: { device_id: number }) {
  return request('http://1.116.159.212:19192/api/iot/action', {
    method: 'GET',
    params,
  });
}
