const mix = require("laravel-mix");
const path = require('path');

mix.setPublicPath('assets');
mix.autoload({
    jquery: ['$', 'window.jQuery', 'JQuery']
})

mix.webpackConfig({
    resolve: {
        extensions: ['.vue', '.ts', '.js'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
            '@admin': path.resolve(__dirname, 'src/admin/'),
            '@frontend': path.resolve(__dirname, 'src/admin/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_module/,
                options: { appendTsSuffixTo: [/\.vue$/] }
            },
        ],
    },
});

mix
    .vue()
    .ts('src/admin/index.ts', 'assets/js/admin.js')
    .sourceMaps(false)
    .extract(["vue"]);

mix
    .vue()
    .ts('src/frontend/index.ts', 'assets/js/frontend.js')
    .sourceMaps(false)
    .extract(["vue"]);

mix.css('src/index.css', 'assets/css/index.css');
mix.copy("src/assets/images", "assets/images/");