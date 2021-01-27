<template>
  <div v-if="!!article" class="container m-auto grid grid-cols-6 gap-3 p-3 bg-blue-200">
    <div class="m-3">
      <h3 v-if="!!article.id"># {{article.id}}</h3>
      <h3 v-else>New</h3>
    </div>
    <div class="m-3">
      <input type="text" :readonly="!isEdit" placeholder="Title" v-model="article.title" class="pl-2 w-full rounded outline-none border-2 border-blue-200 focus:border-blue-600" />
    </div>
    <div class="m-3 col-span-4">
      <input type="text" :readonly="!isEdit" placeholder="Description" v-model="article.description" class="pl-2 w-full rounded outline-none border-2 border-blue-200 focus:border-blue-600" />
    </div>
    <div class="m-3 flex flex-row items-start">
      <input type="checkbox" :disabled="!isEdit" v-model="article.public" id="public-checkbox" class="mr-2 mt-1">
      <label for="public-checkbox">Publish</label>
    </div>
    <div :class="isAuthor ? 'col-span-4 m-3' : 'col-span-5 m-3'">
      <textarea rows="15" placeholder="Content..." :readonly="!isEdit" v-model="article.content" class="p-2 w-full rounded outline-none border-2 border-blue-200 focus:border-blue-600">
      </textarea>
    </div>
    <div v-if="isAuthor" class="flex flex-col items-end m-3">
      <template v-if="isEdit">
        <router-link to="/">
          <button class="bg-gray-200 hover:bg-gray-400 p-3 m-2">Cancel</button>
        </router-link>
        <button class="bg-red-200 hover:bg-red-400 p-3 m-2" @click="remove">Delete</button>
        <button class="bg-green-200 hover:bg-green-400 p-3 m-2" :disabled="!article.title || !article.content" @click="save">Save</button>
      </template>
      <button
        v-else
        class="bg-green-200 hover:bg-green-400 p-3"
        @click="isEdit = true"
      >Edit</button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex';

  export default {
    name: 'article',
    data () {
      return {
        cleanArticle: {
          id: null,
          title: '',
          description: '',
          content: '',
          public: false
        },
        article: Object.assign({}, this.initialArticle),
        isEdit: false,
        isArticleLoaded: false
      }
    },
    props: {
      id: {
        type: Number,
        default: null
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      ...mapGetters(['isAuthenticated']),
      isAuthor: {
        get () {
          return this.isArticleLoaded && this.isAuthenticated && (this.article.id == null || (this.article.user && this.user.id === this.article.user.id));
        }
      }
    },
    methods: {
      ...mapActions(['createArticle', 'readArticle', 'updateArticle', 'deleteArticle']),
      save () {
        if (this.article.id == null) {
          this.createArticle(this.article)
            .then(id => {
              this.$router.push(`view/${id}`)
            });
        } else {
          this.updateArticle(this.article)
            .then(() => {
              this.$router.push('/')
            });
        }
      },
      remove () {
        this.deleteArticle(this.article.id)
          .then(() => {
            this.$router.push('/')
          });
      },
      setArticle (id) {
        if (id == null) {
          this.article = Object.assign({}, this.cleanArticle);
          this.isEdit = true;
          this.isArticleLoaded = true;
        } else {
          this.isEdit = false;
          this.readArticle(id)
            .then(article => {
              this.article = article;
              this.isArticleLoaded = true;
            })
        }
      }
    },
    mounted () {
      this.setArticle(this.id);
    },
    watch: {
      id: function (newId) {
        this.setArticle(newId);
      }
    }
  }
</script>
