const nodeExternals = require('webpack-node-externals');
const path = require('path');



const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'build');

const loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 15000,
                        name: "[name].[ext]",
                    },
                },
            },
        ],
    },
});
module.exports = {
    context: srcPath,
    entry: 'server.js',
    output: {
        path: distPath,
        filename: 'server.js',
        publicPath: '/public/',
    },

    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },

    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json'],
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    
    module: {
        rules: [
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 15000,
                        name: "[name].[ext]",
                    },
                },
            },
            
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // babelrc: false,

                query: {
                    presets: [
                        ['env', {
                            targets: {
                                node: 8,
                            },
                        }],
                    ],
                    "plugins": ["transform-object-rest-spread", "dynamic-import-webpack","react-loadable/babel"]
                }
            },
        ],
    },
    externals: nodeExternals(),
    

};