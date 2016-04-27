var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: [
      __dirname + '/Scripts/entry.js'
    ],
    output: {
        path: __dirname + '/Build/',
        publicPath: "/Build/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [ 
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.jsx$/, loader: 'babel-loader!jsx-loader?harmony' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            { 
                test: /\.(eot|woff|woff2|svg|ttf)$/, 
                loader: "file-loader" ,
                query : {
                        limit : 10000,
                        // Fonts目录
                        name : 'Bootstrap/fonts/[name]_[hash].[ext]'
                    }
            }
        ]
    },
    resolve:{
        //自动补全识别哪些后缀
        extensions:['','.js','.jsx'],
         //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            Hello : '../Components/Hello.js',//后续直接 require('Hello') 即可
        }
    },
    devtool: false,
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
              'NODE_ENV': JSON.stringify('production')  //发布时添加
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: false
            }
        }),
        new ExtractTextPlugin('Bootstrap/css/[name].css')
    ]
};