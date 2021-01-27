import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';
import {API_TOKEN, getToken} from './common';

// добавить токент клиента
axios.interceptors.request.use(
  config => {
    config.params = config.params || {};
    config.params.XDEBUG_SESSION_START = 'VSCODE';

    config.baseURL = 'http://127.0.0.1/api/v1';
    config.timeout = 30000;

    const token = localStorage[API_TOKEN];
    if(token) {
        config.headers.Authorization = token;
    }
    config.headers.Accept = 'application/json';
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

export default new Vuex.Store({
  state: {
    page: 1,
    user: null
  },
  getters: {
    isAuthenticated: state => {
      return !!state.user;
    }
  },
  mutations: {
    SET_PAGE: (state, page) => {
      state.page = page;
    },
    SET_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {

    // PAGE
    setCurrentPage: ({commit}, page) => {
      commit('SET_PAGE', page);
    },

    // USER
    getUser: ({commit}) => {
      return axios.get(`/user?token=${getToken()}`)
        .then(response => {
          commit('SET_USER', response.data || null);
        })
    },
    registerUser: (_, credetials) => {
      return axios.put('/user', credetials);
    },
    loginUser: ({commit}, credetials) => {
      return axios.post('/user', credetials)
        .then((response) => {
          const {token, user} = response.data;
          localStorage.setItem(API_TOKEN, token);
          commit('SET_USER', user);
        });
    },
    logoutUser: ({commit}) => {
      commit('SET_USER', null);
      localStorage.removeItem(API_TOKEN);
    },

    // ARTICLES
    getArticles: (_, page) => {
      return axios.get(`/article?page=${page}`)
        .then(response => {
          return response.data;
        });
    },
    // CRUD
    createArticle: (_, article) => {
      return axios.post('/article', article)
        .then(returnData);
    },
    readArticle: (_, id) => {
      return axios.get(`/article/${id}`)
        .then(returnData);
    },
    updateArticle: (_, article) => {
      return axios.patch(`/article/${article.id}`, article)
        .then(returnData);
    },
    deleteArticle: (_, id) => {
      return axios.delete(`/article/${id}`)
        .then(returnData);
    }
  }
});

const returnData = response => {
  return response.data;
};
