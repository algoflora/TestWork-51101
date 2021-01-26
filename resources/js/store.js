import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router.js';

export const USER_TOKEN = 'userToken';

// добавить токент клиента
axios.interceptors.request.use(
  config => {
    config.params = config.params || {};
    config.params.XDEBUG_SESSION_START = 'VSCODE';

    config.baseURL = 'http://127.0.0.1/api/v1';
    config.timeout = 30000;

    const token = localStorage[USER_TOKEN];
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
  },
  error => {
    if (error.response.status === 401) {
      console.warn('Unauthorized, logging out ...');
      auth.logout();
      router.replace('/');
    } else  {
      console.error(error.response);
    }
    return Promise.reject(error.response);
  }
);

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    articles: [],
    user: {}
  },
  getters: {
    isAuthenticated: state => {
      return !!state.user;
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ARTICLES: (state, articles) => {
      state.articles = articles
    }
  },
  actions: {

    // USER
    getUser: ({commit}) => {
      return axios.get('/user')
        .then(user => {
          commit(SET_USER, user);
        })
    },
    registerUser: (context, credetials) => {
      return axios.put('/user', credetials);
    },
    loginUser: ({commit}, credetials) => {
      return axios.post('/user', credetials)
        .then(({token, user}) => {
          localStorage.setItem(USER_TOKEN, token);
          commit(SET_USER, user);
        });
    },
    logoutUser: () => {
      localStorage.removeItem(USER_TOKEN);
    },

    // ARTICLES
    getArticles: ({commit}) => {
      axios.get('/article')
        .then(articles => {
          commit(SET_ARTICLES, articles);
        })
    },
    // CRUD
    createArticle: (article) => {
      return axios.put('/article', article);
    },
    readArticle: (id) => {
      return axios.get(`/article/${id}`);
    },
    updateArticle: (article) => {
      return axios.post('/article', article);
    },
    deleteArticle: (id) => {
      return axios.delete(`/article/${id}`);
    }
  }
});
