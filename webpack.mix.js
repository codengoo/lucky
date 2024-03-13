const mix = require("laravel-mix");
const path = require('path');

mix.setPublicPath('assets');

mix.alias({
    '@src': path.resolve(__dirname, 'src/'),
    '@admin': path.resolve(__dirname, 'src/admin/'),
    '@bankcard': path.resolve(__dirname, 'src/frontend/bankCard'),
    '@messagecard': path.resolve(__dirname, 'src/frontend/messageCard'),
    '@messageform': path.resolve(__dirname, 'src/frontend/messageForm')
})

mix
    .ts('src/admin/index.tsx', 'assets/js/admin.js')
    .sourceMaps(false)
    .react();

mix
    .react()
    .ts('src/frontend/bankCard/index.tsx', 'assets/js/bankCard.js')
    .sourceMaps(false);

mix
    .react()
    .ts('src/frontend/messageCard/index.tsx', 'assets/js/messageCard.js')
    .sourceMaps(false);

mix
    .react()
    .ts('src/frontend/messageForm/index.tsx', 'assets/js/messageForm.js')
    .sourceMaps(false);

mix.css('src/index.css', 'assets/css/index.css');
mix.copy("src/assets/images", "assets/images/");