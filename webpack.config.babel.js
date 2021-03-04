import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import fs from 'fs';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV !== 'production';

console.log(`NodeJS Build Mode : ${process.env.NODE_ENV}, isDevelopment: ${isDevelopment}`);

module.exports = {
  entry: ['./src/polyfills.ts', './src/app.tsx'],
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  mode: isProduction ? 'production' : 'development',
  target: isProduction ? ['web', 'es5'] : 'web',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: /node_modules/,
        use: [
          // isDevelopment && {
          //   loader: 'babel-loader',
          //   options: { plugins: ['react-refresh/babel'] },
          // },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: isProduction ? false : true,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'static/media',
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: /.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './public/favicon/favicon.ico',
      baseUrl: isProduction ? '/' : '/',
      hash: true,
    }),
    // new ReactRefreshWebpackPlugin(),
    // new ForkTsCheckerWebpackPlugin(),
  ],
  optimization: isDevelopment
    ? {}
    : {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
          chunks: 'async',
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
  devServer: {
    clientLogLevel: 'silent',
    hot: true,
    contentBase: [path.resolve(__dirname, 'dist')],
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https: true,
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem'),
    ca: fs.readFileSync('./config/rootCA.pem'),
    disableHostCheck: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
