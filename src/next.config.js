// next.config.js is not transformed by Babel. So you can only use javascript features supported by your version of Node.js.
const path = require('path');

module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        // Perform customizations to webpack config
        // Important: return the modified config
        config.resolve.alias['~'] = path.resolve(__dirname, './');
        return config;
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? 'https://qinyuanbin.github.io/' : '',
    // another configuration
};
