const webpack = require('webpack');
const path = require('path');
const isProdBuild = process.env.NODE_ENV === 'PRODUCTION';
const webpackRxjsExternals = require( 'webpack-rxjs-externals');

module.exports = {

  entry: [
    './src/index'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: isProdBuild ? 'common-app.min.js' : 'common-app.js',
    library: 'CommonApp',
    libraryTarget: 'umd'
  },
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  externals: [
    webpackRxjsExternals(),
    {'rxjs': 'Observable'},
    'redux-observable',
    'redux',
    'redux-package',
    'typed-immutable',
    'typed-immutable-record'
  ],
/*
 ,
 'meteor-client',
 'loglevel',
 'redux-package',
 'underscore'
 */
  // Source maps support ('inline-source-map' also works)
 // devtool: 'source-map',

  // Add the loader for .ts files.
  module: {
    loaders: [

      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        exclude: [/node_modules/]
      }
    ]
  },

  plugins: isProdBuild ? [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
        warnings: false,
      },
    }),
//    new CheckerPlugin(),

  ]: [
//    new CheckerPlugin()

  ]
};

