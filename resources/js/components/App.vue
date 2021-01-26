<template>
  <div class="container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
import VueRouter from 'vue-router';

export default {
  name: 'app',
  components: {
    Navbar
  },
  mounted () {
    console.log("App component mounted...");
  }
}
</script>

