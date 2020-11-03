

module.exports = {
  mode: 'universal',
  telemetry: false,
  env: {
    baseUrl: process.env.root,
    mongoUrl: 'mongodb://127.0.0.1:27017/navigation',
    secretKey: 'xiaobing_19960412_jwttoken',
  },
  server: {},
  /*`
  ** Headers of the page
  */
  head: {
    title: '极客猿梦导航-专注独立开发者的导航站',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keyword', name: 'description', content: '极客猿梦导航,导航站' },
      { hid: 'description', name: 'description', content: '专注独立开发者的导航站' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//at.alicdn.com/t/font_552690_njqotmfk5k.css' }
    ],
    script: [
      { src: '//v1.cnzz.com/z_stat.php?id=1279139494&web_id=1279139494', defer: 'defer' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/static/styles/style.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-inject',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
}
