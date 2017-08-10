/**
 * Created by newhuan on 2017/6/13.
 */
var path = require('path');
var webpack = require('webpack');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        index: ['babel-polyfill', './dist/js/index/index.js'],
        test: ['babel-polyfill', './dist/js/test/test.js'],
    },
    output: {
        path: __dirname + "\\dist\\dest\\js",
        filename: '[name]compiled.js',
        publicPath: "./dest/js/",
    },
    resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "dist")
        ],
        alias: {
            //this is not correct
            // "Public$": path.resolve(__dirname, 'dist/js/public'),
        }
    }
    ,
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['es2015']
                }
            },
            {//compile scss
                test: /\.scss$/,
                include: __dirname + "\\dist\\css\\",
                loader: "style-loader!css-loader!sass-loader"
            },
            {//url-handler
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    devtool: "source-map",//delete before release
    plugins: [
        new webpack.ProvidePlugin({//在全局设置$为jquery
            jQuery: "jquery",
            $: "jquery"
            }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true//set false before release
        })
        // new UglifyJSPlugin({
        //     test: /\.jsx?$/i,
        //     exclude: /(node_modules|bower_components)/,
        //     sourceMap: true
        // })
    ]
};