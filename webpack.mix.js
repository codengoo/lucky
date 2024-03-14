const mix = require("laravel-mix");
const path = require('path');

mix.setPublicPath('assets');

mix.alias({
    '@src': path.resolve(__dirname, 'src/'),
    '@admin': path.resolve(__dirname, 'src/admin/'),
    '@frontend': path.resolve(__dirname, 'src/frontend/')
})

mix
    .ts('src/admin/index.tsx', 'assets/js/admin.js')
    .react()
    .sourceMaps(false)
    .extract(["react"])

mix
    .ts('src/frontend/index.tsx', 'assets/js/frontend.js')
    .react()
    .sourceMaps(false)
    .extract(["react"])

mix.css('src/index.css', 'assets/css/index.css');
mix.copy("src/assets/images", "assets/images/");