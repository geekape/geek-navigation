import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/pages/Index.vue";


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index
	}
]

let router = new VueRouter({
	mode: 'history',
	routes
})

// router.beforeEach((to, from, next) => {
// 	const token = Vue.prototype.$storage.get('TOKEN')
//   if (to.path == '/admin' && !token) {
//     return next('/login')
//   }
//    next()
// })

export default router;