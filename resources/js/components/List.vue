<template>
  <div class="mt-40 mx-auto">
    <ul class="mb-4">
      <router-link v-for="article in articles" :key="`list-element-${article.id}`" :to="`/view/${article.id}`">
        <list-element :article="article" />
      </router-link>
    </ul>
    <div class="w-1/2 mx-auto flex flex-row justify-between items-start">
      <router-link to="/new">
        <button
            class="disabled:opacity-50 bg-blue-200 hover:bg-blue-400 p-3"
            :disabled="!isAuthenticated"
            :title="!isAuthenticated ? 'Log in to create article' : false"
        >Create Article</button>
      </router-link>
      <div class="space-x-2">
        <span v-for="link in filteredLinks"
              :key="`link-${link.index}`"
              :class="link.active ? 'font-semibold cursor-normal' : 'cursor-pointer'" v-html="link.label"
              @click="followLink(link)"
        ></span>
      </div>
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
      links: [],
      lastPage: null
    };
  },
  props: {
    page: {
      type: Number,
      default: 1
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    }),
    ...mapGetters(['isAuthenticated']),
    filteredLinks () {
      return this.links.map((link, index) => Object.assign(link, {index: index})).filter(link => !!link.url);
    }
  },
  methods: {
    ...mapActions(['getArticles', 'setCurrentPage']),
    followLink (link) {
      if (link.active) {
          return;
      }
      let index = link.index;
      if (index > this.lastPage) {
        index = this.page + 1;
      } else if (index < 1) {
        index = this.page - 1;
      }
      this.$router.push(`/${index}`)
    },
    setPage () {
      this.setCurrentPage(this.page);
      this.getArticles(this.page)
        .then(data => {
          this.articles = data.data;
          this.links = data.links;
          this.lastPage = data.last_page;
        });
    }
  },
  mounted () {
    this.setPage();
  },
  watch: {
    page () {
      this.setPage();
    }
  },
  components: {
    ListElement
  }
}


</script>
