const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function (env, argv) {
  const IS_DEV_MODE = argv.mode !== 'production';

  return {
    mode: IS_DEV_MODE ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.[hash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    ...(IS_DEV_MODE ? {devtool: 'inline-source-map'} : {}),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    devServer: {
      contentBase: './dist',
      inline: true,
      port: 8080,
      stats: 'errors-only'
    },
    plugins: [
      ...(IS_DEV_MODE ? [] : [new CleanWebpackPlugin()]),
      new HtmlWebpackPlugin({
        template: 'src/index.template.ejs',
        meta: {
          viewport: 'width=device-width, initial-scale=1'
        },
        title: 'react-ts',
      })
    ]
  };
};