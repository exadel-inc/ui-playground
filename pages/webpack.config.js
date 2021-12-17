const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'playground': './src/playground.ts'
  },
  resolve: {
    modules: ['../node_modules'],
    roots: [],
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        exclude: /node_modules\/(?!@exadel\/esl)/,
        test: /\.(ts|js)$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            target: 'ES6',
            declaration: false
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/bundles'),
    filename: '[name].js'
  }
};
