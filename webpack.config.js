var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080/');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}


// webpack.config.js
var DEBUG = process.env.NODE_ENV !== 'production' ? true : false;
var scssStyles = 'style-loader!css-loader?sourceMap!postcss-loader!sass-loader?sourceMap';

module.exports = {
    entry: getEntrySources([
        './src/app/main'
    ]),
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    eslint: {
        configFile: './.eslintrc'
    },
    output: {
        path: __dirname + '/public',
        publicPath: 'http://localhost:8080/src/',
        filename: 'application.js'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('application.css', {
            allChunks: true
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            }, {
                test: /\.scss$/,
                loader: DEBUG ? scssStyles : ExtractTextPlugin.extract("style-loader", "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader")
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['Android >= 2.3', 'iOS >= 7', 'Chrome >= 46'] })
    ],
    eslint: {
        configFile: './.eslintrc',
    }
};
