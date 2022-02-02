'use strict';
module.exports = app => {
  const jwt = app.middleware.jwt({ app });
  const { router, controller } = app;
  // 用户
  router.post('/admin/login', controller.admin.user.login);
  // 文章
  router.get('/admin/article', jwt,controller.admin.article.index);
  router.post('/admin/article/add',jwt, controller.admin.article.add);
  router.get('/admin/article/getArticle',jwt, controller.admin.article.getArticle);
  router.post('/admin/article/editArticle',jwt, controller.admin.article.editArticle);
  router.post('/admin/article/delArticle',jwt, controller.admin.article.delArticle);
  router.get('/admin/article/getCache',jwt, controller.admin.article.getCache);
  router.post('/admin/article/addCache', jwt,controller.admin.article.addCache);
  router.post('/admin/article/delCache', jwt,controller.admin.article.delCache);
  // 分类
  router.get('/admin/category',jwt, controller.admin.category.index);
  router.post('/admin/category/add',jwt, controller.admin.category.add);
  router.post('/admin/category/edit',jwt, controller.admin.category.edit);
  router.post('/admin/category/del',jwt, controller.admin.category.del);
}