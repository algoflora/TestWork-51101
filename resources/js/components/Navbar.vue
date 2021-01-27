<template>
    <header class="w-full p-2 bg-blue-500 flex flex-row justify-between align-center">
        <router-link to="/"><h4>List</h4></router-link>
        <auth />
    </header>
</template>

<script>
  import Auth from './Auth.vue';
  import {mapGetters} from 'vuex';

  export default {
    name: 'navbar',
    components: {
      Auth
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
    mounted() {
      console.log('Navbar component mounted...');
    }
  }
</script>
