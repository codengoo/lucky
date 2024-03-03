<?php

namespace Lucky\Includes;

use Lucky\Constants\Hook;

class Frontend {
    public function __construct() {
        error_log('frontend_content constructor');
        add_action(Hook::WP_ENQUEUE_SCRIPT, [$this, 'load_frontend_content'], 99);
    }

    public function load_frontend_content() {
        error_log('frontend_content');

        $this->load_styles();
        $this->load_scripts();
    }

    public function load_scripts() {
        wp_register_script('wplk-manifest', WPLK_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        wp_register_script('wplk-vendor', WPLK_PLUGIN_URL . 'assets/js/vendor.js', ['wplk-manifest'], rand(), true);
        wp_register_script('wplk-frontend', WPLK_PLUGIN_URL . 'assets/js/frontend.js', [], rand(), true);

        wp_enqueue_script('wplk-manifest');
        wp_enqueue_script('wplk-vendor');
        wp_enqueue_script('wplk-frontend');

        global $post;

        wp_localize_script('wplk-frontend', 'WPLKPathx', [
            'admin'  => admin_url('/'),
            'ajax'   => admin_url(''),
            'api'    => home_url('/wp-json'),
            'assets' => WPLK_PLUGIN_URL . 'assets/',
            'post'   => $post
        ]);
    }

    public function load_styles() {
        wp_register_style('wplk-frontend', WPLK_PLUGIN_URL . 'assets/css/index.css');

        wp_enqueue_style('wplk-frontend');
    }
}
