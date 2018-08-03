const SERVICEID = require('./src/config.js').SERVICEID
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log('env.BABEL_ENV:', process.env.BABEL_ENV)
const env = process.env.BABEL_ENV ? process.env.BABEL_ENV : 'dev'

module.exports = {
  mode: env ? (env === 'prod' ? 'production' : 'development') : 'development',
  devtool: 'cheap-source-map',
  cache: true,
  entry: {
    app: './src/app.js',
    service: './src/service.register.js',
    widget: './src/widget.register.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: env === 'prod' ? `/${SERVICEID}/` : '',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js'
  },
  devServer: {
    port: 3000,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    overlay: true
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory=true',
          options: getBabelConfig(env)
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|woff)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 256
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['dist/*.js', 'dist/*.map']),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'src/lib',
        to: 'lib'
      }
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      chunks: ['app'],
      title: SERVICEID
    })
  ]
}

function getBabelConfig(env) {
  env = env || 'dev'

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
      'transform-object-rest-spread'
    ]
  }
  if (env !== 'dev') {
    babelrc.presets[0][1].targets.browsers = ['ie >= 9']
    babelrc.plugins = [
      'transform-class-properties',
      'transform-object-rest-spread',
      'transform-runtime'
    ]
  }
  return babelrc
}
