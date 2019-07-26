require("babel-polyfill");

var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');

var globals = require("./buildGlobals");

globals.getDefines();

var serverHost = "0.0.0.0";
var serverPort = "8086";

// Основные настройки
var config = {
    cache: true,
    serverHost: serverHost,
    serverPort: serverPort,
    entry: [
        "webpack-dev-server/client?http://" + serverHost + ":" + serverPort,
        "webpack/hot/only-dev-server",
        "./src/index.js"
    ],
    devtool: "eval-source-map",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js",
        publicPath: "/build/"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: ["node_modules"]
    },
    module: {
        loaders: [
            /* React Loader with Babel and hot load */
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules(?![\/\\]@igor[\/\\])/,
                include: __dirname,
                loaders: ["react-hot", "babel-loader?cacheDirectory=./cache/"] // react-hot-loader, babel-loader
            },
            /* React Loader with Babel and hot load */
            {
                test: /\.(less)$/,
                loader: "style-loader!css-loader?-minimize&camelCase&localIdentName=[name]__[local]___[hash:base64:5]&importLoaders=3!postcss-loader!less-loader" +
                        "?includePaths[]=" + (path.resolve(__dirname, "./node_modules")) +
                        "!" + globals.prepend + "?appendData=" + globals.sassGlobals
            }
        ]
    },
    postcss: function () {
        return [
            autoprefixer
        ];
    },
    plugins: [
        // Исключить все файлы с локализациями для уменьшения размера,
        // локализация должна загружаться отдельно
        new webpack.IgnorePlugin(/^\.\/locale$/),
        new webpack.IgnorePlugin(/^\.\/lang/),
        new webpack.ProvidePlugin({
            React: "react"
        }),
        //Константы для прекомпиляции
        new webpack.DefinePlugin(globals.definePlugin),
        new webpack.SourceMapDevToolPlugin({}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

module.exports = config;