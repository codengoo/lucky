<?php

namespace SharingForm\Includes;

use SharingForm\Constants\Hook;
use SharingForm\Constants\Capability;
use SharingForm\Constants\App;

class Admin
{
    public function __construct()
    {
        add_action(Hook::AD_MENU, [$this, 'create_admin_menu']);
        add_action(Hook::AD_ENQUEUE_SCRIPT, [$this, 'load_admin_content'], 99);
    }

    public function create_admin_menu()
    {
        $slug = App::SLUG;

        add_menu_page(
            App::NAME,
            App::FULLNAME,
            Capability::MN_OPTIONS,
            $slug,
            [$this, 'menu_page_template'],
            'dashicons-buddicons-pm'
        );

        add_submenu_page(
            $slug,
            "Create your card",
            "Create",
            Capability::MN_OPTIONS,
            'admin.php?page=' . $slug . '#/'
        );

        add_submenu_page(
            $slug,
            "View history",
            "History",
            Capability::MN_OPTIONS,
            'admin.php?page=' . $slug . '#/history'
        );

        remove_submenu_page($slug, $slug);
    }

    public function menu_page_template()
    {
        echo '<div id="wpsf-admin-app"></div>';
    }

    public function load_admin_content()
    {
        $this->load_styles();
        $this->load_scripts();
    }

    public function load_scripts()
    {
        wp_register_script('wpsf-manifest', WPSF_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        wp_register_script('wpsf-vendor', WPSF_PLUGIN_URL . 'assets/js/vendor.js', ['wpsf-manifest'], rand(), true);
        wp_register_script('wpsf-admin', WPSF_PLUGIN_URL . 'assets/js/admin.js', [], rand(), true);

        wp_enqueue_script('wpsf-manifest');
        wp_enqueue_script('wpsf-vendor');
        wp_enqueue_script('wpsf-admin');

        wp_localize_script('wpsf-admin', 'WPSFPath', [
            'admin'  => admin_url('/'),
            'ajax'   => admin_url(''),
            'api'    => home_url('/wp-json'),
            'page'   => home_url('/sharingform'),
            'assets' => WPSF_PLUGIN_URL . 'assets/'
        ]);
    }

    public function load_styles()
    {
        wp_register_style('wpsf-admin', WPSF_PLUGIN_URL . 'assets/css/index.css');

        wp_enqueue_style('wpsf-admin');
    }
}
