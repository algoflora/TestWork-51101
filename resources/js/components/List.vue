<template>
  <div class="mt-40 mx-auto">
    <ul class="mb-4">
      <router-link v-for="article in articles" :key="`list-element-${article.id}`" :to="`article/${article.id}`">
        <list-element  :article="article" />
      </router-link>
    </ul>
    <div class="w-1/2 mx-auto flex flex-row justify-between items-start">
      <router-link to="edit">
        <button
            class="disabled:opacity-50 bg-blue-200 hover:bg-blue-400 p-3"
            :disabled="!isAuthenticated"
            :title="!isAuthenticated ? 'Log in to create article' : false"
        >Create Article</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ListElement from './ListElement'
import {mapActions, mapState, mapGetters} from 'vuex';

export default {
  name: 'list',
  data () {
    return {
      articles: [],
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['getArticles'])
  },
  mounted() {
    this.getArticles()
      .then(data => {
        console.log('List mounted:', data);
        this.articles = data.data;
        this.currentPage = data.currentPage;

      });
  }
}
</script>
