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
module.exports = env => {
    console.log(env.FRONTEND_ENV)
    return {

        context: srcPath,
        entry: env.FRONTEND_ENV==='preact'? `server/index.preact.js` : 'server/index.js',
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
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        // options: {
                        //     babelrc: false,
                        //     presets: [
                        //         ['env', {
                        //             targets: {
                        //                 node: 8,
                        //             },
                        //     }], 'react'
                        //     ],
                        //     "plugins": [
                        //         "transform-object-rest-spread",
                        //         "dynamic-import-webpack",
                        //         "react-loadable/babel"]
    
                        // }
                    }
                }
                // {
                //     test: /\.js$/,
                //     exclude: /node_modules/,
                //     loader: 'babel-loader',
                //     babelrc: false,
                //     query: {
                //                         }
                // },
            ],
        },
        externals: nodeExternals(),
        
    }

};