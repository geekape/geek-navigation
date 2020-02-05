'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // category
  router.get('/api/category', controller.category.list);
  router.post('/api/category', controller.category.add);
  router.delete('/api/category', controller.category.delete);
  router.put('/api/category', controller.category.edit);

  // website
  router.get('/api/website', controller.website.list);
  router.post('/api/website', controller.website.add);
  router.delete('/api/website', controller.website.delete);
  router.put('/api/website', controller.website.edit);
};
