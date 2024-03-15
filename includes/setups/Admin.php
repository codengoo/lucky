<?php

namespace Lucky\Setup;

use Lucky\Constants\Hook;

class Admin {
    public function __construct() {
        add_action(Hook::AD_ENQUEUE_SCRIPT, [$this, 'load_content'], 99);
    }

    public function load_content() {
        $this->load_styles();
        $this->load_scripts();
    }

    public function load_scripts() {
        wp_register_script('wplk-manifest', WPLK_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        wp_register_script('wplk-vendor', WPLK_PLUGIN_URL . 'assets/js/vendor.js', ['wplk-manifest'], rand(), true);
        wp_register_script('wplk-admin', WPLK_PLUGIN_URL . 'assets/js/admin.js', ['wplk-vendor'], rand(), true);

        wp_enqueue_script('wplk-manifest');
        wp_enqueue_script('wplk-vendor');
        wp_enqueue_script('wplk-admin');

        wp_localize_script('wplk-admin', 'WPLKPath', [
            'admin'  => admin_url('/'),
            'ajax'   => admin_url(''),
            'api'    => home_url('/wp-json'),
            'page'   => home_url('/lucky'),
            'assets' => WPLK_PLUGIN_URL . 'assets/'
        ]);
    }

    public function load_styles() {
        wp_register_style('wplk-admin', WPLK_PLUGIN_URL . 'assets/css/index.css');

        wp_enqueue_style('wplk-admin');
    }
}
