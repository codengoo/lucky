const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, 'src/'),
                '@admin': path.resolve(__dirname, 'src/admin/'),
                '@frontend': path.resolve(__dirname, 'src/admin/'),
            }
        }
    }
}