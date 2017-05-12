// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import store from './store'
import Multiselect from 'vue-multiselect'
import VueSocketio from 'vue-socket.io'

import App from './App'

import DashboardPage from './pages/DashboardPage.vue'
import LoginPage from './pages/LoginPage.vue'
import ChatPage from './pages/ChatPage.vue'

import PrivateMessageInbox from './components/private-messages/PrivateMessageInbox.vue'
import PrivateMessageSent from './components/private-messages/PrivateMessageSent.vue'
import PrivateMessageView from './components/private-messages/PrivateMessageView.vue'
import PrivateMessageCompose from './components/private-messages/PrivateMessageCompose.vue'

import Logger from './plugins/Logger'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Logger, {loggin: true})
// const moment = require('moment')
// Vue.use(require('vue-moment'), {
//   moment
// })

Vue.component('app', App)
Vue.component('multiselect', Multiselect)
Vue.use(VueSocketio, 'http://localhost:8890')

const routes = [
  {path: '/', component: LoginPage, name: 'home'},
  {path: '/dashboard', component: DashboardPage, name: 'dashboard', meta: { requiresAuth: true }},
  {path: '/chat', component: ChatPage, name: 'chat', meta: { requiresAuth: true }},
  {path: '/inbox-pms', component: PrivateMessageInbox, name: 'inbox-pms', meta: { requiresAuth: true }},
  {path: '/sent-pms', component: PrivateMessageSent, name: 'my-sent-pms', meta: { requiresAuth: true }},
  {path: '/pms/:id', component: PrivateMessageView, name: 'pm-view', meta: { requiresAuth: true }},
  {path: '/new-pm', component: PrivateMessageCompose, name: 'new-pm', meta: { requiresAuth: true }}
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.access_token) {
      next()
    } else {
      next({name: 'home'})
    }
  }
  next()
})

new Vue({
  router,
  store
}).$mount('#app')
