import Vue from 'vue';
import App from '../components/App.vue';
import List from '../components/List.vue';
import ListElement from '../components/ListElement.vue';
import Auth from '../components/Auth.vue';
import Article from '../components/Article.vue';

Vue.component('List', List);
Vue.component('ListElement', ListElement);
Vue.component('Article', Article);
Vue.component('Auth', Auth);

const ROOT_URL = '/';

const routes = [
  {
    path: ROOT_URL,
    component: App,
    name: 'home',
    meta: {
      guest: true
    }
  }
];

export default routes;
