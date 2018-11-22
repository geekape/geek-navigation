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
	routes
})

export default router;