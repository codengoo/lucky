<?php

namespace Lucky\Setup;

use Lucky\Constants\App;
use Lucky\Constants\Capability;
use Lucky\Constants\Hook;

class Menu {
    public function __construct() {
        add_action(Hook::AD_MENU, [$this, 'create_admin_menu']);
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
            "QRCode",
            Capability::MN_OPTIONS,
            'admin.php?page=' . $slug . '#/'
        );

        add_submenu_page(
            $slug,
            "View history",
            "History",
            Capability::MN_OPTIONS,
            'admin.php?page=' . $slug . '#/qr/history'
        );

        add_submenu_page(
            $slug,
            "Create message",
            "Message",
            Capability::MN_OPTIONS,
            'admin.php?page=' . $slug . '#/message/create'
        );

        remove_submenu_page($slug, $slug);
    }

    public function menu_page_template() {
        echo '<div id="wplk-admin-app"></div>';
    }
}
