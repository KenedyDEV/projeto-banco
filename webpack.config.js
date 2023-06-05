const path = require('path')

module.exports ={
  entry: {
    index: './dist/js/index.js',
    createAccount: './dist/js/createAccount.js',
    loginAccount: './dist/js/loginAccount.js',
    address: './dist/js/address.js',
    password: './dist/js/password.js',
    welcome: './dist/js/welcome.js'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist/public'),
    filename: '[name].bundle.min.js'
  },
  devServer: {
    static: [
      {directory: path.resolve(__dirname, 'dist')}
    ]
  }
}