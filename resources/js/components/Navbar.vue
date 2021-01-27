<template>
  <header class="w-full p-2 bg-blue-500 flex flex-row justify-between align-center">
    <router-link :to="`/${page}`" class="text-semibold text-lg flex flex-row justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 mx-2">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back to the List
    </router-link>
    <auth />
  </header>
</template>

<script>
  import Auth from './Auth.vue';
  import {mapState, mapGetters} from 'vuex';

  export default {
    name: 'navbar',
    components: {
      Auth
    },
    computed: {
      ...mapState({
        page: state => state.page
      }),
      ...mapGetters(['isAuthenticated'])
    }
  }
</script>
