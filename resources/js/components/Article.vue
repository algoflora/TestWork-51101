<template>
  <div v-if="!!article" class="container m-auto grid grid-cols-6 gap-3 bg-blue-200">
    <div>
      <h3 v-if="!!article.id"># {{article.id}}</h3>
      <h3 v-else>New</h3>
    </div>
    <div>
      <input type="text" :disabled="!isEdit" placeholder="Title" v-model="article.title" class="pl-2 rounded outline-none border-2 border-blue-200 focus:border-blue-600" />
    </div>
    <div class="col-span-4">
      <input type="text" :disabled="!isEdit" placeholder="Description" v-model="article.title" class="w-full pl-2 rounded outline-none border-2 border-blue-200 focus:border-blue-600" />
    </div>
    <div class="flex flex-col items-start">
      <input type="checkbox" :disabled="!isEdit" v-model="article.public" id="public-checkbox" class="mr-2">
      <label for="public-checkbox">Publish</label>
    </div>
    <div :class="isAuthor ? 'col-span-4' : 'col-span-5'">
      <textarea placeholder="Content..." :disabled="!isEdit" v-model="article.content" class="w-full pl-2 rounded outline-none border-2 border-blue-200 focus:border-blue-600">
      </textarea>
    </div>
    <div v-if="isAuthor" class="flex flex-col items-end">
      <template v-if="isEdit">
        <router-link to="/">
          <button class="bg-grey-200 hover:bg-grey-400 p-3">Cancel</button>
        </router-link>
        <button class="bg-blue-200 hover:bg-blue-400 p-3" @click="save">Cancel</button>
      </template>
      <button
        v-else
        class="bg-blue-200 hover:bg-blue-400 p-3"
        @click="isEdit = true"
      >Edit</button>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex';

  export default {
    name: 'list-element',
    data () {
      return {
        article: null,
        isEdit: false
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
          return this.isAuthenticated && this.user.id === this.article.user.id;
        }
      }
    },
    methods: {
      ...mapActions(['readArticle']),
      save () {

      }
    },
    watch: {
      id: function (newId) {
        if (newId === null) {
          this.article === {
            id: null,
            title: '',
            description: '',
            content: '',
            public: false
          };
          this.isEdit = true;
        } else {
            this.isEdit = false;
          this.article = this.readArticle(newId)
        }
      }
    }
  }
</script>
