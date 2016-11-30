const elixir = require('laravel-elixir');

require('laravel-elixir-vue-2');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */

elixir((mix) => {
    mix.sass('app.scss')
       .copy('node_modules/material-design-iconic-font/dist/fonts', 'public/fonts')
       .copy('node_modules/element-ui/lib/theme-default/fonts', 'public/fonts')
       .webpack('main.js', 'public/js/app.js');
});
