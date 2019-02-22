import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import ArticleList from '../view/list.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    // base: '/admin/',
    routes: [
      {
        path: '/',
        // component: Dashboard
        redirect:'/maplayermanage'
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/add',
        component: () => import('../view/write/index.vue')
      },
      {
        path: '/article/detail/:id',
        component: () => import('../view/detail.vue')
      },
      {
        path:'/maplayermanage',
        component:()=>import('../view/resource/maplayer.vue')
      },
      {
        path:'/basemapmanage',
        component:()=> import('../view/resource/basemapmanage.vue')
      },
      {
        path:'/mapmanage',
        component:()=> import('../view/resource/mapmanage.vue')
      },
      {
        path:'/servicemanage',
        component:()=> import('../view/resource/servicemanage.vue')
      },
      {
        path:'/lodsmanage',
        component:()=> import('../view/resource/lodsmanage.vue')
      },
      {
        path: '*', component: () => import('../view/notfound.vue')
      }
    ]
  });
}