let webpack = require('webpack');
let path = require('path');

module.exports = {
  entry: {
    entry: __dirname + '/scripts/script.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}

