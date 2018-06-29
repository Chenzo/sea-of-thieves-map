
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: "source-map",
  output: {
    filename: '[name].js',
    sourceMapFilename: 'maps/[name].js.map'
  },
  module: {

  },
  plugins: [
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
};