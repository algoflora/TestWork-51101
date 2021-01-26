import VueRouter from 'vue-router';
import {store} from './store';
import routes from './router/routes.js';

const router = new VueRouter({
    mode: 'history',
    routes: routes
});


router.beforeEach((to, from, next) => {
    if (!store.user && !!localStorage['userToken']) {
        store.dispatch('getUser')
            .then(() => {
                next();
            });
    } else {
        next();
    }
});

export default router;
