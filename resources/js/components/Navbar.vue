<template>
    <div class="fixed bg-teal-500 flex flex-row justify-between">
        <router-link to="list">List</router-link>
        <auth />
    </div>
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
