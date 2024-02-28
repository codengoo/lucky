<?php

namespace Lucky\Includes;

class Admin {
    public function __construct() {
        // add_action("admin_menu", [$this, 'admin_menu']);
    }

    public function admin_menu() {
        global $submenu;

        $capability = 'manage_options';
        $slug = 'lucky';

        $hook = add_menu_page(
            __( 'WP Vue Kickstart', 'textdomain' ),
            __( 'WP Vue Kickstart', 'textdomain' ),
            $capability,
            $slug,
            [ $this, 'menu_page_template' ],
            'dashicons-money-alt'
        );
    }

    public function menu_page_template() {
        echo '<div class="wrap"><div id="wpvk-admin-app">Hello</div></div>';
    }
}
