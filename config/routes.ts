export default [
  {
    name: '我的设备',
    icon: 'mobile',
    path: '/devices',
    component: './Devices',
  },
  {
    name: '定位',
    icon: 'global',
    path: '/map',
    component: './Map',
  },
  {
    path: '/login',
    component: '@/pages/Login',
    layout: false,
  },
  {
    path: '/',
    redirect: '/devices',
  },
];
