export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user', routes: [{name: '登录', path: '/user/login', component: './user/Login'}]},
    ],
  },

  {name: '审核列表', icon: 'audit', path: '/nav/audit', component: './nav/Audit'},
  {name: '导航列表', icon: 'send', path: '/nav/list', component: './nav/List'},
  {name: '分类列表', icon: 'smile', path: '/nav/category', component: './nav/Category'},
  {name: '标签列表', icon: 'smile', path: '/nav/tag', component: './nav/Tag'},

  {path: '/', redirect: '/nav/audit'},
  {component: './404'},
];
