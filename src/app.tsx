import { PageLoading } from '@ant-design/pro-layout';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  const data = 1;
  return data;
}
