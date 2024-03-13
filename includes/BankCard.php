<?php

namespace SharingForm\Includes;

use SharingForm\Constants\Hook;

class BankCard
{
    public function __construct()
    {
        error_log('bankcard content constructor');
        add_action(Hook::WP_ENQUEUE_SCRIPT, [$this, 'load_bankcard_content'], 99);
    }

    public function load_bankcard_content()
    {
        error_log('bankcard content');

        $this->load_styles();
        $this->load_scripts();
    }

    public function load_scripts()
    {
        wp_register_script('wpsf-manifest', WPSF_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        wp_register_script('wpsf-vendor', WPSF_PLUGIN_URL . 'assets/js/vendor.js', ['wpsf-manifest'], rand(), true);
        wp_register_script('wpsf-bankcard', WPSF_PLUGIN_URL . 'assets/js/bankcard.js', [], rand(), true);

        wp_enqueue_script('wpsf-manifest');
        wp_enqueue_script('wpsf-vendor');
        wp_enqueue_script('wpsf-bankcard');

        global $post;

        wp_localize_script('wpsf-bankcard', 'WPSFPathx', [
            'admin'  => admin_url('/'),
            'ajax'   => admin_url(''),
            'api'    => home_url('/wp-json'),
            'assets' => WPSF_PLUGIN_URL . 'assets/',
            'post'   => $post
        ]);
    }

    public function load_styles()
    {
        wp_register_style('wpsf-bankcard', WPSF_PLUGIN_URL . 'assets/css/index.css');

        wp_enqueue_style('wpsf-bankcard');
    }
}
