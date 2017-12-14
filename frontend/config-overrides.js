const rewirePreact = require('react-app-rewire-preact');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const DynamicCDNWebpackPlugin = require('dynamic-cdn-webpack-plugin')

var _require = require('react-app-rewired'),
    injectBabelPlugin = _require.injectBabelPlugin;

function rewirePreload(config, env) {
    config.plugins = [
        ...config.plugins,
        new DynamicCDNWebpackPlugin(),
    new PreloadWebpackPlugin({
        rel: 'prefetch'
    }),
     ]
    return config;
}

function rewireLoadable(config,env){
    config.plugins = [
        ...config.plugins,
        new ReactLoadablePlugin({
            filename: './src/react-loadable.json',
        }),
    ]
    return injectBabelPlugin(["react-loadable/babel"], config);
}

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    // use the Preact rewire
    if (env === "production") {
        console.log("⚡ Production build with Preact");
        config = rewirePreact(config, env);
        config = rewireStyledComponents(config, env, {
            ssr: true,
        })
        config = rewirePreload(config, env)
        config = rewireLoadable(config, env)
    }

    return config;
}