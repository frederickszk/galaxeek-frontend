import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { currentUser as queryCurrentUser } from './services/antd-pro/api';
import { history, Link, RunTimeLayoutConfig } from 'umi';

import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { LinkOutlined } from '@ant-design/icons';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// export async function getInitialState()
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // const data = 1;
  // The function of fetching user info.
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();

      // Todo: 需要再了解一下，msg定义和实际后端返回的东西。
      // 可能和express.js的用法有关，返回的值中包括了data,errorCode,errorMessage和success。
      // 但是看起来通过api端口提供的东西，拿到的只有data。所以源代码中写的msg.data还是msg本身是存疑的。

      // return msg.data;
      return msg;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  // Main execution of the function

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };

  // return data;
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,

    // Key logic for re-direct the page to the login page.
    onPageChange: () => {
      const { location } = history;

      // If no log-in (the currentUser is NULL)
      if (!initialState?.currentUser && location.pathname != loginPath) {
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,

    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],

    ...initialState?.settings,
  };
};
