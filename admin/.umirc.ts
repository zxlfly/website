import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/login', component: '@/pages/login' },
    {
      exact: false, path: '/', component: '@/layouts/index',wrappers: ['@/wrappers/auth',],
      routes: [
        { exact: true, path: '/', component: '@/pages/handleArticle/[data]' },
        { exact: true, path: '/articleList', component: '@/pages/articleList' },
        { exact: true, path: '/categoryList', component: '@/pages/categoryList' },
        { exact: true, path: '/handleCategory/:data', component: '@/pages/handleCategory/[data]'},
        {exact: true, path: '/handleArticle/:data', component: '@/pages/handleArticle/[data]'},
        {exact: true, path: '/info', component: '@/pages/info'}
      ]
    },
  ],
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false,
  },
});
