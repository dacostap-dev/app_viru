import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: 'create',
          name: 'create',
          component: () => import('./components/Promotion/CreatePromotionComponent.vue'),
        },
        {
          path: 'promotions',
          name: 'promotions',
          component: () => import('./components/Promotion/PromotionsListComponent.vue'),
          
        },
        {
          path: 'promotions/:id',
          component: () => import('./components/Student/StudentListComponent.vue'),
          props: true,
        },
        {
          path:'/promotions/:id/:name',
          component: () => import('./components/Modul/ModulsListComponent.vue'),
          props: true,
        },
        {
          path:'/promotions/:id/:name/:modul',
          name: 'modul.detail',
          component: () => import('./components/Modul/ModulDetailComponent.vue'),
          props: true,
        },
        {
          path:'/buscar',
          name: 'buscar',
          component: () => import('./components/Student/StudentSearchComponent.vue'),
        }
      ]
    },
  ]
})
