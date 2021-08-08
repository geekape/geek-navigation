// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  base: '/',
  publicPath: '/',
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  // mfsu: {},
  // webpack5: {
  //   // lazyCompilation: {},
  // },
});
