import Vue from 'vue'
import VueRouter from 'vue-router'
import Taskboard from '../views/Taskboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/taskboard',
    name: 'Taskboard',
    component: Taskboard,
    meta: {
      title: "Taskboard"
    }
  },
  {
    path: '/discussion',
    name: 'Discussion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "discussion" */ '../views/Discussion.vue'),
    meta: {
      title: "Discussion"
    }
  },
  {
    path: '/completion',
    name: 'Completion screen',
    component: () => import('../views/Completion.vue'),
    meta: {
      title: "Discussion complete"
    }
  },
  {
    path: '/intro',
    name: 'Intro',
    component: () => import('../views/Intro.vue'),
    meta: {
      title: "Intro"
    }
  },
  {
    path: '/',
    name: 'Achievements',
    component: () => import('../views/Achievements.vue'),
    meta: {
      title: "Achievements"
    }

  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpCarousel.vue'),
    meta: {
      title: "Tutorial"
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
