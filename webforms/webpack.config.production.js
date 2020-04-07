const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const staticFolder = "static";

module.exports = {
  mode: "production",
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: `${staticFolder}/js/[name].[contenthash].js`,
    chunkFilename: `${staticFolder}/js/[name].[contenthash].chunk.js`
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `${staticFolder}/css/[name].[contenthash].css`,
      chunkFilename: `${staticFolder}/css/[id].[contenthash].chunk.css`,
      ignoreOrder: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: false,
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
      }
    },
    runtimeChunk: true,
    minimizer: [
      new TerserPlugin({cache: true, parallel: true, sourceMap: true, terserOptions: {}}),
      new OptimizeCSSAssetsPlugin({})
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"]
          }
        }
      },
      
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
              sourceMap: true
            }
          }
        ]
      },
      
      {
        test: /node_modules.*\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader},
          'css-loader'
        ]
      },
      
      {
        test: /.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: `file-loader`,
        options: {
          name: `${staticFolder}/images/[name].[contenthash].[ext]`
        }
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: "/node_modules/",
        loader: `url-loader`,
        options: {
          limit: 10000,
          name: `${staticFolder}/fonts/[name].[contenthash].[ext]`,
        }
      }
    ]
  },
  performance: false,
};
