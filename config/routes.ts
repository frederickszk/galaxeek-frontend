export default [
  {
    path: '/welcome',
    component: '@/pages/index',
    icon: 'crown',
    name: '我的设备',
  },
  {
    path: '/login',
    component: '@/pages/Login',
    layout: false,
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: '卡片列表',
    path: '/devices',
    component: './Devices',
  },
];
