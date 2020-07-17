import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _07259a28 = () => interopDefault(import('../pages/admin/index.vue' /* webpackChunkName: "pages/admin/index" */))
const _ff6e837a = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _3037c8d4 = () => interopDefault(import('../pages/admin/category.vue' /* webpackChunkName: "pages/admin/category" */))
const _7adebb74 = () => interopDefault(import('../pages/admin/list.vue' /* webpackChunkName: "pages/admin/list" */))
const _92bdc9a8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _07259a28,
    name: "admin"
  }, {
    path: "/login",
    component: _ff6e837a,
    name: "login"
  }, {
    path: "/admin/category",
    component: _3037c8d4,
    name: "admin-category"
  }, {
    path: "/admin/list",
    component: _7adebb74,
    name: "admin-list"
  }, {
    path: "/",
    component: _92bdc9a8,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
