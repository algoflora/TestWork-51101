import VueRouter from 'vue-router';
import store from './store';
import {getToken} from './common';

const ROOT_URL = '/';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: ROOT_URL,
      component: List,
    },
    {
      path: ROOT_URL + 'new' ,
      component: Article,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: ROOT_URL + 'view/:id' ,
      component: Article,
    }
  ]
});

router.beforeEach((to, from, next) => {
  const apiToken = getToken()
  if (!store.getters.isAuthenticated && !!apiToken && apiToken !== 'undefined') {
    store.dispatch('getUser')
      .then(() => {
        next();
      });
  } else {
    next();
  }
});

export default router;
