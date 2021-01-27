import VueRouter from 'vue-router';
import store from './store';
import {getToken} from './common';
import List from './components/List';
import Article from './components/Article';

const ROOT_URL = '/';

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: ROOT_URL,
      component: List,
    },
    {
      path: ROOT_URL + ':page',
      component: List,
      props(route) {
        const props = { ...route.params };
        props.page = +props.page;
        return props;
      },
    },
    {
      path: ROOT_URL + 'new' ,
      component: Article,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: ROOT_URL + 'view/:id' ,
      component: Article,
      props(route) {
        const props = { ...route.params };
        props.id = +props.id;
        return props;
      },
    }
  ]
});

router.beforeEach((to, from, next) => {
  const apiToken = getToken()
  if (!store.getters.isAuthenticated && !!apiToken && apiToken !== 'undefined' && apiToken !== 'null') {
    store.dispatch('getUser')
      .then(() => {
        next();
      });
  } else {
    next();
  }
});

export default router;
