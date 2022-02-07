'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/index', controller.default.home.index);
  router.post('/api/getList', controller.default.home.getList);
  router.post('/api/getDetail', controller.default.home.getDetail);
  router.post('/api/getInfo', controller.default.home.getInfo);
  router.post('/api/getAd', controller.default.home.getAd);
  router.post('/api/getNav', controller.default.home.getNav);
}