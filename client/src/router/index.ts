import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import App from '../App.vue'
import AppLayout from '../views/app-layout.vue'
import Dashboard from '../views/profile/dashboard.vue'
import Experiences from '../views/profile/experiences.vue'
import Formations from '../views/profile/formations.vue'
import Skills from '../views/profile/skills.vue'
import Login from '../views/auth/login.vue'
import Personal from '../views/profile/personal.vue'
import Register from '../views/auth/register.vue'
import Resume from '../views/resume.vue'
import NotFound from '../views/not-found.vue'

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
      },
      {
        path: '*',
        component: NotFound
      },
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
        component: Dashboard
      },
      {
        path: 'formations',
        name: 'Formations',
        component: Formations
      },
      {
        path: 'experience',
        name: 'Experience',
        component: Experiences
      },
      {
        path: 'skills',
        name: 'Skills',
        component: Skills
      },
      {
        path: 'personal',
        name: 'Personal',
        component: Personal
      },
      {
        path: '*',
        component: NotFound
      },
    ]
  },
  {
    path: '*',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
