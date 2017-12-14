const rewirePreact = require('react-app-rewire-preact');
const rewireStyledComponents = require('react-app-rewire-styled-components');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

function rewirePreload(config, env) {
    config.plugins = [
        ...config.plugins,
    new PreloadWebpackPlugin({
        rel: 'prefetch'

    })
     ]
    return config;
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
    }

    return config;
}