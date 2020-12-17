import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/options/login.vue'
import Register from '../views/options/register.vue'
import AppLayout from '../views/app-layout.vue'
import Add from '../views/add.vue'
import App from '../App.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  /* {
    path: '/',
    name: 'Home',
    component: Home
  }, */
  {
    path: '/auth',
    component: App,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/add',
        name: 'Add',
        component: Add
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
