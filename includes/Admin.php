<?php

namespace Lucky\Includes;

use Lucky\Constants\Hook;
use Lucky\Constants\Capability;
use Lucky\Constants\App;

class Admin {
    public function __construct() {
        add_action(Hook::AD_MENU, [$this, 'create_admin_menu']);
        add_action("wp_enqueue_scripts", [$this, 'load_admin_content'], 99);
    }

    public function create_admin_menu() {
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

    public function menu_page_template() {
        echo '<div id="wplk-admin-app"></div>';
    }

    public function load_admin_content() {
        $this->load_styles();
        $this->load_scripts();
    }

    public function load_scripts() {
        wp_register_script('wplk-manifest', WPLK_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        wp_register_script('wplk-vendor', WPLK_PLUGIN_URL . 'assets/js/vendor.js', ['wplk-manifest'], rand(), true);
        wp_register_script('wplk-admin', WPLK_PLUGIN_URL . 'assets/js/admin.js', [], rand(), true);

        wp_enqueue_script('wplk-manifest');
        wp_enqueue_script('wplk-vendor');
        wp_enqueue_script('wplk-admin');

        wp_localize_script('wplk-admin', 'WPLKPath', [
            'admin'  => admin_url('/'),
            'ajax'   => admin_url(''),
            'api'    => home_url('/wp-json'),
            'assets' => WPLK_PLUGIN_URL . 'assets/'
        ]);
    }

    public function load_styles() {
        wp_register_style('wplk-admin', WPLK_PLUGIN_URL . 'assets/css/index.css');

        wp_enqueue_style('wplk-admin');
    }
}
