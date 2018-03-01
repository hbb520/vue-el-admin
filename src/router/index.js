// const Table = () => import() 懒加载

import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
const Home = () => import('../views/home/index.vue');
const Table = () => import('../views/basics-table/index.vue');
const TableAdd = () => import('../views/basics-table/add.vue');
const Timeline = () => import('../views/timeline/index.vue');
const Editor = () => import('../views/editor/index.vue');
const Upload = () => import('../views/upload/index.vue');

Vue.use(Router);

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: [
    {path: '/', component: Login},
    {path: '/login', component: Login},
    {
      path: '/example',
      name: 'example',
      component: Home,
      redirect: '/example/table',
      meta: {title: '参考案例'},
      children: [
        {
          path: 'table',
          name: 'table',
          component: Table,
          meta: {title: '表格'},
        },
        {
          path: 'table_add',
          name: 'table_add',
          component: TableAdd,
          meta: {title: '添加', father: '表格', fatherPath: '/example/table'}
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload,
          meta: {title: '上传'}
        },
        {
          path: 'editor',
          name: 'editor',
          component: Editor,
          meta: {title: '富文本'}
        }, {
          path: 'timeline',
          name: 'timeline',
          component: Timeline,
          meta: {title: '时间轴'}
        }
      ]
    },
  ]
});
