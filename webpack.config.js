var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlPlugin = require('html-webpack-plugin')
var Handlebars = require('handlebars')['default']

var path = require('path')
var fs = require('fs')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  // devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],

  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist')
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': true
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlPlugin({
      templateContent: function (data) {
        return Handlebars.compile(
          fs.readFileSync(
            path.resolve(__dirname + '/src/templates/index.handlebars'), 'utf-8'
          )
        )(data.htmlWebpackPlugin.files)
        // return require('./src/templates/index.handlebars')(data.htmlWebpackPlugin.files)
      }
    })
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'),
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.handlebars$/,
      loader: 'handlebars-loader',
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.svg$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      exclude: /node_modules/,
      include: __dirname
    }]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules']
  },

  cssnext: {
    browsers: 'last 2 versions'
  }
}
