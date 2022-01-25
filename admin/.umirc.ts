import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/login', component: '@/pages/login' },
    {
      exact: false, path: '/', component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/addArticle', component: '@/pages/addArticle' },
        { exact: true, path: '/categoryList', component: '@/pages/categoryList' },
      ]
    },
  ],
  fastRefresh: {},
});
