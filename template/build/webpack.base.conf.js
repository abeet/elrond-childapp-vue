'use strict'
const SERVICEID = require('../src/config.js').SERVICEID
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  enforce: 'pre',
  test: /\.(js|vue)$/,
  exclude: resolve('node_modules'),
  include: resolve('src'),
  loader: 'eslint-loader',
  options: {
    formatter: require('eslint-friendly-formatter'),
    'parserOptions': {
      'parser': 'babel-eslint'
    },
    'env': {
      'browser': true
    },
    'plugins': [
      'elrond-childapp-bound'
    ],
    'rules': {
      'comma-dangle': 0,
      'generator-star-spacing': 0,
      'indent': 0,
      'semi': 0,
      'no-multiple-empty-lines': 0,
      'no-unused-vars': 0,
      'no-tabs': 0,
      'space-before-blocks': 0,
      'space-before-function-paren': 0,
      'vue/no-unused-vars': 0,
      'elrond-childapp-bound/no-global-declaration': 2,
      'elrond-childapp-bound/no-write-cookie': 2
    }
  }
})

const createBabelOptions = () => {
  const babelrc = {
    'presets': [
      [
        'env', {
          'targets': {
            'browsers': ['edge >= 15']
          },
          'modules': false,
          'useBuiltIns': false
        }
      ]
    ],
    'plugins': [
      'syntax-dynamic-import',
      'transform-object-rest-spread'
    ]
  }
  if (process.env.IE) {
    babelrc.presets[0][1].targets.browsers = ['ie >= ' + process.env.IE]
    babelrc.plugins = [
      'syntax-dynamic-import',
      'transform-object-rest-spread',
      'transform-class-properties',
      'transform-runtime'
    ]
  }
  return babelrc
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/app.js',
    service: './src/service.js',
    widget: './src/widget.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  externals: {
    // 库已经在页面中引入，使用全局变量代替对库的引用，库内容不用再打包到app.js中
    jquery: 'jQuery',
    axios: 'axios',
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    'element-ui': 'ELEMENT'
  },
  module: {
    rules: [
      ...[createLintingRule()],
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: resolve('node_modules'),
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
        options: createBabelOptions()
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096, // 4K左右
          name: 'assets/images/[name].[hash:6].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096, // 4K左右
          name: 'assets/media/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096, // 4K左右
          name: 'assets/fonts/[name].[hash:6].[ext]'
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
