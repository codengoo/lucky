<?php

namespace SharingForm\Includes;

use SharingForm\Constants\Hook;

class MessageForm
{
    public function __construct()
    {
        error_log('messageform content constructor');
        add_action(Hook::WP_ENQUEUE_SCRIPT, [$this, 'load_messageform_content'], 99);
    }

    public function load_messageform_content()
    {
        error_log('messageform content');

        $this->load_styles();
        $this->load_scripts();
    }

    public function load_scripts()
    {
        wp_register_script('wpsf-manifest', WPSF_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        wp_register_script('wpsf-vendor', WPSF_PLUGIN_URL . 'assets/js/vendor.js', ['wpsf-manifest'], rand(), true);
        wp_register_script('wpsf-messageform', WPSF_PLUGIN_URL . 'assets/js/messageform.js', [], rand(), true);

        wp_enqueue_script('wpsf-manifest');
        wp_enqueue_script('wpsf-vendor');
        wp_enqueue_script('wpsf-messageform');

        global $post;

        wp_localize_script('wpsf-messageform', 'WPSFPathx', [
            'admin'  => admin_url('/'),
            'ajax'   => admin_url(''),
            'api'    => home_url('/wp-json'),
            'assets' => WPSF_PLUGIN_URL . 'assets/',
            'post'   => $post
        ]);
    }

    public function load_styles()
    {
        wp_register_style('wpsf-messageform', WPSF_PLUGIN_URL . 'assets/css/index.css');

        wp_enqueue_style('wpsf-messageform');
    }
}
