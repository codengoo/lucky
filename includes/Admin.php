<?php

namespace Lucky\Includes;

class Admin {
    public function __construct() {
        add_action("admin_menu", [$this, 'admin_menu']);
        add_action("admin_enqueue_scripts", [$this, 'admin_content'], 99);
    }

    public function admin_menu() {
        // https://wordpress.org/documentation/article/roles-and-capabilities/#manage_options
        $capability = 'manage_options';
        $slug = 'lucky';

        add_menu_page(
            'Lucky',
            'Lucky cards',
            $capability,
            $slug,
            [$this, 'menu_page_template'],
            'dashicons-buddicons-pm'
        );

        if (current_user_can($capability)) {
            add_submenu_page(
                $slug,
                "Create your card",
                "Create",
                $capability,
                'admin.php?page=' . $slug . '#/'
            );

            add_submenu_page(
                $slug,
                "View history",
                "History",
                $capability,
                'admin.php?page=' . $slug . '#/history'
            );

            remove_submenu_page("lucky", "lucky");
        }

        // error_log(print_r($submenu, true));
    }

    public function admin_content() {
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
            'adminUrl'  => admin_url('/'),
            'ajaxUrl'   => admin_url('admin-ajax.php'),
            'apiUrl'    => home_url('/wp-json'),
            'assets' => WPLK_PLUGIN_URL . 'assets/',
        ]);
    }

    public function load_styles() {
        wp_register_style('wplk-admin', WPLK_PLUGIN_URL . 'assets/css/admin.css');

        wp_enqueue_style('wplk-admin');
    }

    public function menu_page_template() {
        echo '<div id="wplk-admin-app"></div>';
    }
}
