<template>
  <div id="app">
    <!--http://video.duc.cn/api/video/findByCategoryId-->

    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {  },
    data() {
      return {
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    display: block;
  }

</style>
