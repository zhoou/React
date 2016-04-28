var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

var options = {
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
            { 
                test: /\.jsx?$/, 
                loader: 'babel' 
            },
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style","css")
            },
            { 
                test: /\.(eot|woff|woff2|svg|ttf)$/, 
                loader: "file" ,
                query : {
                        limit : 10000,
                        // Fonts目录
                        name : 'Content/fonts/[name]_[hash].[ext]'
                    }
            }
        ]
    },
    babel:{
        presets: ['react', 'es2015'] // 要使用的编译器
    },
    resolve:{
        //自动补全识别哪些后缀
        extensions:['','.js','.jsx'],
         //模块别名定义，方便后续直接引用别名，无须多写长长的地址
        alias: {
            Hello : '../Components/Hello.js',//后续直接 require('Hello') 即可
        }
    },
    plugins:[
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('./Content/css/[name].css',{
            allChunks:true
        }),
        commonsPlugin
    ]
};

if(process.env.NODE_ENV==="production"){
    options.devtool=false;
    options.plugins=options.plugins.concat([
        new webpack.DefinePlugin({
            'process.env':{
              'NODE_ENV': JSON.stringify('production')  //发布时添加
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
         compress:{
              warnings: false
             }
        })
    ]);
};

module.exports=options;