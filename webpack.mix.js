const mix = require("laravel-mix");
const path = require('path');

mix.setPublicPath('assets');
mix.autoload({
    jquery: ['$', 'window.jQuery', 'JQuery']
})

mix.alias({
    '@src': path.resolve(__dirname, 'src/'),
    '@admin': path.resolve(__dirname, 'src/admin/'),
    '@frontend': path.resolve(__dirname, 'src/admin/'),
});

mix.js('src/frontend/index.js', 'assets/js/frontend.js').sourceMaps(false);
mix
    .js('src/admin/index.js', 'assets/js/admin.js')
    .sourceMaps(false)
    .vue()
    .extract(["vue"]);

mix.css('src/index.css', 'assets/css/index.css');
mix.copy("src/assets/images", "assets/images/");