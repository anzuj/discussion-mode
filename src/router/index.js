import Vue from 'vue'
import VueRouter from 'vue-router'
import Taskboard from '../views/Taskboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/taskboard',
    name: 'Taskboard',
    component: Taskboard,
 
  },
  {
    path: '/discussion',
    name: 'Discussion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "discussion" */ '../views/Discussion.vue'),
 
  },
  {
    path: '/completion',
    name: 'Completion screen',
    component: () => import('../views/Completion.vue'),
  
  },
  {
    path: '/intro',
    name: 'Intro',
    component: () => import('../views/Intro.vue'),
  
  },
  {
    path: '/',
    name: 'Achievements',
    component: () => import('../views/Achievements.vue'),

  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpCarousel.vue'),
  
  }

]

const router = new VueRouter({
  routes
})

export default router
