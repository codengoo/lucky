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
    .sourceMaps(false)
    .react()
    .extract(["react"])
    .postCss("src/index.css", "assets/css/index.css", [
        require("tailwindcss"),
    ]);

// mix
//     .react()
//     .ts('src/frontend/index.ts', 'assets/js/frontend.js')
//     .sourceMaps(false)
//     .extract(["vue"]);

// mix.postCss('src/index.css', 'assets/css/index.css');
mix.copy("src/assets/images", "assets/images/");