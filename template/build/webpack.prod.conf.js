'use strict'
const SERVICEID = require('../src/config.js').SERVICEID
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HashedChunkidsPlugin = require('./hashed-chunkids-webpack-plugin.js')

const faster = process.env.MODE == 'faster'

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
  output: {
    filename: SERVICEID + '-[name].[chunkhash:6].js',
    chunkFilename: SERVICEID + '-[name].[chunkhash:6].js',
    publicPath: `/${SERVICEID}/`
  },
  optimization: {
    minimizer: faster ? []: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    })]
  //   splitChunks: {
  //     cacheGroups: {
  //       vendors: {
  //         name: `vendors`,
  //         test: /[\\/]node_modules[\\/]/,
  //         chunks: 'all'
  //       }
  //     }
  //   }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(['../dist/*.js', '../dist/*.map'], {
      allowExternal: true
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[chunkhash:6].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      chunks: ['app'],
      title: SERVICEID,
      inject: true
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    new HashedChunkidsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: 'assets',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../src/lib'),
        to: 'lib',
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig
