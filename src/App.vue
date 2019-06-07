<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {},
  mounted() {
    this.initCNZZ()
  },
  methods: {
    initCNZZ() {
      //添加脚本
      const script = document.createElement('script')
      script.src =
        'https://s23.cnzz.com/z_stat.php?id=1277683689&web_id=1277683689'
      script.language = 'JavaScript'
      script.id = 'cnzz'
      document.body.appendChild(script)
    }
  },
  watch: {
    $route() {
      if (window._czc) {
        //监听路由变化
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
    },
    cnzzEvent: function(category, action, label, value, nodeid) {
      //cnzz事件统计
      if (window._czc) {
        czc.push(['_trackEvent', category, action, label, value, nodeid])
      }
    }
  }
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
