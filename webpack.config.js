const path = require('path')

const { VueLoaderPlugin } = require('vue-loader')
const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack =require('webpack') 

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')({
                  browsers: ['last 5 versions']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg|svg)/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,   /* 减少http请求 */
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: 'body'
    })
  ],
  resolve: {
    /* 把原来路径映射到一个新的路径 */
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  }
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'  // 便于调试，但速度慢
  config.devServer = {
    port: 8000,
    host: '127.0.0.1',
    overlay: {
      errors: true
    },
    open: true /* 自动打开浏览器 */
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),  // 热加载
    new webpack.NoEmitOnErrorsPlugin()   // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
  )
} else {
  config.entry = {
    app: path.resolve(__dirname, 'src/main.js'),
    vendor: ['vue']
  }
  config.optimization = {
    splitChunks: {
      name: 'vendor'
    }
  }
}

module.exports = config