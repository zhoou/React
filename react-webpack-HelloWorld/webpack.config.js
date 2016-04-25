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
            { test: /\.jsx$/, loader: 'babel-loader!jsx-loader?harmony' }
        ]
    }
};