<?php

namespace Lucky\Includes;

class Frontend {
    public function __construct() {
        // add_action('wp_enqueue_scripts', 'load_scripts');
    }

    function load_styles() {
    }

    // function load_scripts() {
    //     error_log(get_stylesheet_directory_uri());
    //     wp_register_script(
    //         'front_app',
    //         get_stylesheet_directory_uri() . '/spa/dist/build.js',
    //         [],
    //         false,
    //         true
    //     );

    //     global $post;

    //     wp_localize_script(
    //         'front_app',
    //         'WPLK_Data',
    //         [
    //             'template_directory_uri' => get_stylesheet_directory_uri(),
    //             'rest_url' => untrailingslashit(esc_url_raw(rest_url())),
    //             'app_path' => $post->post_name
    //         ]
    //     );

    //     wp_enqueue_script('front_app');
    // }
}


// function vuetwentyseventeen_enqueue_styles() {

// 	$parent_style = 'parent-style';

// 	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
// 	wp_enqueue_style( 'child-style',
// 		get_stylesheet_directory_uri() . '/style.css',
// 		array( $parent_style ),
// 		wp_get_theme()->get( 'Version' )
// 	);

// 	// add Bootstrap to the child theme.
// 	wp_register_style( // Bootstrap styles.
// 		'vue_bootstrap_styles',
// 		get_stylesheet_directory_uri() . '/assets/css/bootstrap.min.css',
// 		array(),
// 		false,
// 		'all'
// 	);

// 	wp_register_script(  // Bootstrap scripts.
// 		'vue_bootstrap_script',
// 		get_stylesheet_directory_uri() . '/assets/js/bootstrap.min.js',
// 		array( 'jquery' ),
// 		false,
// 		true
// 	);

// 	// enqueue the Bootstrap script and styles.
// 	wp_enqueue_style( 'vue_bootstrap_styles' );
// 	wp_enqueue_style( 'vue_bootstrap_script' );

// }