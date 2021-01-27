import store from './store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router.js';
import App from './components/App'

// window.eventBus = new Vue(); // события
// window.Vue = Vue;
// window.store = store;
// //Подключение компонентов
// require('./component');

Vue.use(VueRouter);

const app = new Vue({
  store,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app');

export default app;
