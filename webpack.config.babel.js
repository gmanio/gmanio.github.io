import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import fs from 'fs';
import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: ['./src/polyfills.ts', './src/app.tsx'],
  devtool: isProduction ? false : 'inline-source-map',
  mode: isProduction ? 'production' : 'development',
  target: ['web', 'es5'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: isProduction ? false : true,
          },
        },
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'main.[chunkhash].css' }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './public/favicon/favicon.ico',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    // writeToDisk: true,
    https: true,
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem'),
    ca: fs.readFileSync('./config/rootCA.pem'),
  },
};
