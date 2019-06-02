import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue'), //Home.vue
    },
    {
      path:'/home', 
      component: () => import('./views/Home.vue'), //Home.vue
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('./components/partials/Carousel.vue'),
				},
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
        },
        {
          path:'/salir',
          name: 'exit',
          component: () => import('./components/Auth/Logout.vue'),
        },
      ]
    }
  ]
})
