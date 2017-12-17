import Vue from 'vue'
import Router from 'vue-router'
import ErrorComponent from '@/components/Error'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/error',
      name: 'error',
      component: ErrorComponent,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      props: true
    }
  ]
})
