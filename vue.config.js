let path = require('path')


function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    baseUrl: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('images', resolve('src/assets/img/'))
    },
    css: {
        loaderOptions: {
            sass: {
                // @/ is an alias to src/
                // so this assumes you have a file named `src/variables.scss`
                data: `@import "@/assets/styles/style.scss";`
            }

        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },

        }
    }
}