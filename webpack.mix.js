const mix = require("laravel-mix")

mix.setPublicPath('assets');
mix.autoload({
    jquery: ['$', 'window.jQuery', 'JQuery']
})

mix.js('src/frontend/index.js', 'assets/js/frontend.js').sourceMaps(false);
mix
    .js('src/admin/index.js', 'assets/js/admin.js')
    .sourceMaps(false)
    .vue()
    .extract(["vue"]);

mix.css('src/admin/index.css', 'assets/css/admin.css');
mix.copy("src/assets/images", "assets/images/");