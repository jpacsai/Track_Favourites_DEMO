import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import BookManager from '@/components/BookManager'
import Auth from '@okta/okta-vue'
import keys from '../../apiKeys.js'

Vue.use(Auth, {
  issuer: 'https://' + keys.domain + '/oauth2/default',
  client_id: keys.id,
  redirect_uri: 'http://localhost:8080/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/book-manager',
      name: 'BookManager',
      component: BookManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
