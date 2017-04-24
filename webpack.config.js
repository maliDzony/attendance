const path = require('path')
const webpack = require('webpack')
const common = require('./webpack.config.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const DEVELOPMENT = process.env.NODE_ENV === 'development'

const webpackConfig = {
  devtool: DEVELOPMENT ? 'eval' : 'cheap-source-map',
  entry: {
    'knip-web-app': [
      'react-hot-loader/patch',
      'babel-polyfill',
      './src/index'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: DEVELOPMENT ? '[name].js' : '[name]-[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': true,
      'process.env.NODE_ENV': DEVELOPMENT ? '"development"' : '"production"'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new FaviconsWebpackPlugin('./favicon.png')
    // new ExtractTextPlugin('styles.css')
  ],
  module: {
    loaders: common.loaders
  },
  devServer: {
    contentBase: __dirname,
    hot: true,
    historyApiFallback: true,
    port: 4000,
    inline: true
  }
}

if (!DEVELOPMENT) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      mangle: true,
      sourceMap: false
    })
  ])
} else {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ])
}

module.exports = webpackConfig
