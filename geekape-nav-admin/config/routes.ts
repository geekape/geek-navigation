export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user', routes: [{name: '登录', path: '/user/login', component: './user/Login'}]},
    ],
  },

  {name: '审核列表', icon: 'smile', path: '/nav/audit', component: './nav/Audit'},
  {name: '导航列表', icon: 'smile', path: '/nav/list', component: './nav/List'},
  {path: '/category', name: '分类列表', icon: 'smile', component: './Category'},

  {path: '/', redirect: '/nav/audit'},
  {component: './404'},
];
