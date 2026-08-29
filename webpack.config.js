const path = require('node:path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    port: 3000,
    hot: true,
  },
}
