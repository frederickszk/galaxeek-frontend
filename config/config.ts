import { defineConfig } from 'umi';
import { join } from 'path';

// const { REACT_APP_ENV } = process.env;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/login', component: '@/pages/Login', layout: false },
  ],
  fastRefresh: {},
  layout: {
    name: 'GalaXeek',
  },
  antd: {
    dark: true,
  },

  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  //   openAPI:[{
  //     requestLibPath: "import { request } from 'umi'",
  //     schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json",
  //     // schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   }],
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      schemaPath:
        'https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json',
      // schemaPath: join(__dirname, 'oneapi.json'),
      projectName: 'antd-pro',
      mock: true,
    },
    // {
    //   requestLibPath: "import { request } from 'umi'",
    //   schemaPath:
    //     'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
    //   projectName: 'swagger',
    // },
  ],
  mfsu: {},
});
