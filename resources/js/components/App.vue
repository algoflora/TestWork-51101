<template>
  <div class="flex flex-col h-screen">
    <navbar />
    <main class="flex-1 overflow-y-auto p-5">
      <router-view />
    </main>
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
}
</script>

