import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import App from '../App.vue'
import AppLayout from '../views/app-layout.vue'
import AuthVerify from './auth-verify'
import Dashboard from '../views/profile/dashboard.vue'
import Experience from '../views/profile/experience.vue'
import Formation from '../views/profile/formation.vue'
import Skills from '../views/profile/skills.vue'
import Login from '../views/auth/login.vue'
import Personal from '../views/profile/personal.vue'
import Register from '../views/auth/register.vue'
import Resume from '../views/resume.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        // beforeEnter: AuthVerify
      },
      {
        path: 'formation',
        name: 'Formation',
        component: Formation,
        // beforeEnter: AuthVerify
      },
      {
        path: 'experience',
        name: 'Experience',
        component: Skills,
        // beforeEnter: AuthVerify
      },
      {
        path: 'skills',
        name: 'Skills',
        component: Skills,
        // beforeEnter: AuthVerify
      },
      {
        path: 'personal',
        name: 'Personal',
        component: Personal,
        // beforeEnter: AuthVerify
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
