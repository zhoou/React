var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('js/common.js');
//var commonsPlugin =require("webpack/lib/optimize/CommonsChunkPlugin");
var htmlWebpackPlugin=require("html-webpack-plugin");

var options = {
    entry: {
        index:__dirname + "/Scripts/entry.js"
    },
    output: {
        path: __dirname + '/Build/',
        publicPath: '../',
        filename: 'js/[name].bundle.js',
        chunkFilename:'js/[id].chunk.js'
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
            },
            {
                test:/\.(jpe?g|png|gif|ico)$/,
                loader:"url",
                query:{
                    limit:5120,
                    name:"./Content/Images/[hash:8].[name].[ext]"
                }
            },
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                loader: "html?attrs=img:src img:data-src"
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
        new ExtractTextPlugin('Content/css/[name].css',{
            allChunks:true
        }),
        // new commonsPlugin({
        //     name:"common",
        //     chunks:['jquery','react'],
        //     minChunks:Infinity
        // }),
        //commonsPlugin,
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',   // 将公共模块提取，生成名为`vendor`bundle
            chunks: ['index'], //提取哪些模块共有的部分,名字为上面的vendor.
            minChunks: Infinity // 提取至少*个模块共有的部分
        }),
        new htmlWebpackPlugin({              //根据模板插入css/js等生成最终HTML
            favicon:'./Content/Images/favicon.ico', //favicon路径
            filename:'View/index.html',    //生成的html存放路径，相对于 path
            template:'./index.html',    //html模板路径
            chunks:['vendor','index'],  //需要引入的chunk，不配置就会引入所有页面的资源.名字来源于你的入口文件
            inject:true,    //允许插件修改哪些内容，包括head与body
            hash:true,    //为静态资源生成hash值
            minify:{    //压缩HTML文件
                removeComments:true,    //移除HTML中的注释
                collapseWhitespace:true    //删除空白符与换行符
            }
        })
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