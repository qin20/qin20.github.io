// next.config.js is not transformed by Babel. So you can only use javascript features supported by your version of Node.js.
const path = require('path');

// var src = 'https://qinyuanbin.github.io/';
var src = '';
module.exports = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
        // Perform customizations to webpack config
        // Important: return the modified config
        config.resolve.alias['~'] = path.resolve(__dirname, './');
        return config;
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? src : '',
    // another configuration
    exportPathMap: function() {
        console.log(arguments);
    }
};
