const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = (env, options) => {
  const mode = process.env.NODE_ENV || options.mode || 'production';

  return {
    // use options mode if set
    mode: mode ? mode : 'production',
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin()
    ],
    module: {
      rules: [{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['cache-loader', 'babel-loader']
      }]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devtool: (mode === 'development') ? 'source-map' : ''
  };
};
