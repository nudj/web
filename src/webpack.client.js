var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

process.traceDeprecation = true

module.exports = {
  entry: {
    'src/server/assets/js/app': './src/app/client'
  },
  output: {
    path: './',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'react',
            ["env", {
              "targets": {
                "browsers": ["last 2 versions", "safari >= 7"]
              }
            }]
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&-url'
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './src/server/assets/css/app.css',
      disable: true,
      allChunks: true
    })
  ],
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin()
    ]
  },
  stats: {
    colors: true,
    cached: false,
    hash: false,
    timings: false,
    version: false,
    warnings: false
  }
}
