import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.post('/api/login', controller.user.login);

  router.post("/api/category", controller.category.add)
  router.delete("/api/category", controller.category.del)
  router.put("/api/category", controller.category.edit)
  router.get("/api/category/list", controller.category.list)

  router.get("/api/nav/list", controller.nav.list)
  router.post("/api/nav", controller.nav.add)
  router.get("/api/nav", controller.nav.get)
  router.get("/api/nav/random", controller.nav.random)
  router.delete("/api/nav", controller.nav.del)
  router.put("/api/nav", controller.nav.edit)
  router.get("/api/nav/find", controller.nav.info)
};