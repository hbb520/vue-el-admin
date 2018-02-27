import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/login';
import Home from '@/views/home';
import Table from '@/views/basics-table/index.vue';
import TableAdd from '../views/basics-table/add.vue';
import Upload from '../views/upload/index.vue';
import Editor from '../views/editor/index.vue';
Vue.use(Router);

export default new Router({
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
        }
      ]
    },
  ]
});
