import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/auth/login.vue'
import Register from '../views/auth/register.vue'
import AppLayout from '../views/app-layout.vue'
import Resume from '../views/resume.vue'
import Formacion from '../views/profile/formacion.vue'
import Experiencia from '../views/profile/experiencia.vue'
import Habilidades from '../views/profile/habilidades.vue'
import Personal from '../views/profile/personal.vue'
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
        path: 'register',
        name: 'Register',
        component: Register
      }
    ]
  },
  {
    path: '/:username',
    name: 'Resume',
    component: Resume
  },
  {
    path: '/profile',
    component: AppLayout,
    children: [
      {
        path: 'formacion',
        name: 'Formacion',
        component: Formacion
      },
      {
        path: 'experiencia',
        name: 'Experiencia',
        component: Experiencia
      },
      {
        path: 'habilidades',
        name: 'Habilidades',
        component: Habilidades
      },
      {
        path: 'personal',
        name: 'Personal',
        component: Personal
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
