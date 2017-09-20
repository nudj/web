const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

process.noDeprecation = true

const environment = process.env.ENVIRONMENT

let plugins = [
  new webpack.DllReferencePlugin({
    context: '.',
    manifest: require('./vendors-manifest.json')
  })
]
console.log('Building for environment:', environment)
if (environment === 'production') {
  plugins = plugins.concat([
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(environment),
        'ENVIRONMENT': JSON.stringify(environment)
      }
    })
  ])
}

module.exports = {
  cache: true,
  entry: {
    'app/server/assets/js/app': './app/client'
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
            path.join(__dirname, 'app'),
            path.join(__dirname, 'node_modules', '@nudj')
        ],
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
      }
    ]
  },
  plugins,
  stats: {
    colors: true,
    cached: false,
    hash: false,
    timings: false,
    version: false,
    warnings: false
  }
}
