import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfo from '../components/UserInfo'
import Pagination from '../components/Pagination'
Vue.use(Router)

var SlideBar
if (window.screen.width > 375) {
 SlideBar = () => import('../components/SlideBar')
}

export default new Router({
  routes: [{
    name: 'root',
    path: '/',
    components: {
      main: PostList
    }
  }, {
    name: 'article',
    path: '/topic/:id&author=:name',
    components: {
      main: Article,
      slideBar:SlideBar
    }
  },
  {
    name: 'user_info',
    path: '/user/:loginname',
    components: {
      main: UserInfo
    }
  }]
})
