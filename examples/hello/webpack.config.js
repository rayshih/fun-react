var path = require('path')

module.exports = {
  entry: {
    app: ['./index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/static/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
