import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import PostDeatils from '../components/Posts/PostDeatils.vue'
import Search from '../components/Search/Search.vue'
import Profile from '../components/Profile/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/Auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/PostDeatils/:id',
    name: 'PostDeatils',
    component: PostDeatils
  },
  {
    path:'/Search',
    name:'Search',
    component:Search
  },
  {
    path:'/Profile/:id',
    name:'Profile',
    component:Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
