var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    index: path.join(__dirname, 'entry.js')
  },
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'], 
  },
  module: {
    loaders: [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        /*
        query: {
          presets: ['react'] 
        }
        */
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]  
}
