<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  mounted() {
      this.initCNZZ()
  },
  methods: {
      initCNZZ() {
          //添加脚本
          const script = document.createElement('script')
          script.src =
              'https://s5.cnzz.com/z_stat.php?id=1277680350&web_id=1277680350'
          script.language = 'JavaScript'
          script.id = 'cnzz'
          document.body.appendChild(script)
      }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
  background: #f3f6f8;
}
</style>
