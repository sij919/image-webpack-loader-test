const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.?(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        resolve: {
          extensions: ['', '.js', '.jsx'],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // jpe?g는 jpg와 jpeg를 의미한다
        use: [
          'file-loader?name=assets/images/[name].[ext]',
          // file-loader는 이미지 파일의 이름을 만들고 폴더를 이동시키는 기능을 한다
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              jpegtran: {
                progressive: true
              },
              gifsicle: {
                optimizationLevel: 3
              },
              // // the webp option will enable WEBP
              // webp: {
              //   quality: 75
              // }
            }
          }
          // image-webpack-loader는 이미지 사이즈를 줄여주는 역할을 한다
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    host: 'localhost',
    port: 3001,
  },
};