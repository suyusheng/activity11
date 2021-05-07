<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view v-wechat-title="$route.meta.title"></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
// import Home from './components/HelloWorld.vue'

export default {
  data(){
    return {

    }
  },
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%
}
</style>
