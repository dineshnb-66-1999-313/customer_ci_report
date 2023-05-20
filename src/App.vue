<template>
  <div class="container-fluid">
      <div class="row">
        <NavigationBar />
      </div>
      <div class="row margin_top">
        <router-view />
      </div>
  </div>
</template>

<script>
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    NavigationBar
  },
}
</script>
<style scoped>
.margin_top{
  margin-top: 3rem;
}
</style>

