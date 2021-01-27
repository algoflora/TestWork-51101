<template>
  <div class="w-1/2 mx-auto my-3 flex flex-col bg-blue-200 hover:bg-blue-400 cursor-pointer group">
    <div class="flex flex-row justify-around p-3">
      <div>
        # {{article.id}}
      </div>
      <div>
        {{article.title}}
      </div>
      <div class="flex flex-row items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 mx-2">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        {{article.user.name}}
      </div>
      <div v-if="isAuthor">
        <div v-if="article.public" class="text-green-600 group-hover:text-green-200 font-semibold" title="Published">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <div v-else class="text-red-600 group-hover:text-red-200 font-semibold" title="Not published">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
          </svg>
        </div>
      </div>
    </div>
    <hr />
    <div class="p-3 text-center">
      <p>{{article.description}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: 'list-element',
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
    props: {
      article: {
        type: Object,
        required: true
      }
    }
  }
</script>
