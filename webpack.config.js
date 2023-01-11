const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HTML 동적 생성 플러그인

module.exports = {
	/* entry: 다른 모듈을 사용하고 있는 최상위 자바스크립트 파일 위치 */
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: 'development',
	/* output: 내보내기할 경로 지정 */
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
			/* js, jsx - babel-loader 설정 */
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
			/* css, sa[c]ss - style-loader(css-loader, sass-loader) 설정 */
      {
        test: /\.s[ac]ss/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
			/* 이미지 파일(git, png, jp[e]g, svg): file-loader */
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        // jpe?g는 jpg와 jpeg를 의미한다
        use: [
          'file-loader?name=[path][name].[ext]',
          /* file-loader는 이미지 파일의 이름을 만들고 폴더를 이동시킴 */
					/* [path][name].[ext]: 'dist/이미지 파일 경로/이미지.확장자' */

					/* image-webpack-loader: 이미지 용량을 최적화시켜 줄임 */
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
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
    port: 3000,
  },
};