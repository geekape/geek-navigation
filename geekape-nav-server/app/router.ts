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
  router.put("/api/nav/audit", controller.nav.audit)
  router.get("/api/nav/reptile", controller.nav.reptile)
  router.get("/api/nav/random", controller.nav.random)
  router.delete("/api/nav", controller.nav.del)
  router.put("/api/nav", controller.nav.edit)
  router.get("/api/nav/find", controller.nav.info)
  router.get("/api/nav/ranking", controller.nav.ranking)

  router.post("/api/tag", controller.tag.add)
  router.delete("/api/tag", controller.tag.remove)
  router.put("/api/tag", controller.tag.update)
  router.get("/api/tag/list", controller.tag.getList)
};
