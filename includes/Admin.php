<?php

namespace Lucky\Includes;

class Admin {
    public function __construct() {
        add_action("admin_menu", [$this, 'admin_menu']);
        add_action("admin_content", [$this, 'admin_content']);
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
        $this->load_scripts();
        // $this->load_styles();
    }

    public function load_scripts() {
        // wp_register_script('wplk-manifest', WPLK_PLUGIN_URL . 'assets/js/manifest.js', [], rand(), true);
        // wp_register_script('wplk-vendor', WPLK_PLUGIN_URL . 'assets/js/vendor.js', ['wpvk-manifest'], rand(), true);
        wp_register_script('wplk-admin', WPLK_PLUGIN_URL . 'assets/js/admin.js', ['wpvk-vendor'], rand(), true);

        wp_enqueue_script('wplk-manifest');
        // wp_enqueue_script('wpvk-vendor');
        // wp_enqueue_script('wpvk-admin');

        wp_localize_script('wplk-admin', 'wplkAdminLocalizer', [
            'adminUrl'  => admin_url('/'),
            'ajaxUrl'   => admin_url('admin-ajax.php'),
            'apiUrl'    => home_url('/wp-json'),
        ]);
    }

    public function menu_page_template() {
        echo '<div class="wrap"><div id="wpvk-admin-app">Hello</div></div>';
    }
}
