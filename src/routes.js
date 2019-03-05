const routes = require('next-routes');

module.exports = routes()
    .add('redirect', '/redirect/:id', 'redirect')
    .add({name: 'beta', pattern: '/v3', page: 'v3'});
