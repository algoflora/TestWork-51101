import {store} from './store';
import Vue from 'vue';
import router from './router.js';

// window.eventBus = new Vue(); // события
// window.Vue = Vue;
// window.store = store;
// //Подключение компонентов
// require('./component');

Vue.use(VueRouter);

const app = new Vue({
  store,
  router
}).$mount('#app');

export default app;
