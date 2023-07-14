import { createStore } from 'vuex'
import Posts from './Posts'
import Auth from './Auth'
import Users from './Users'

export default createStore({
  
  modules: {
    Posts,
    Auth,
    Users
  }
})