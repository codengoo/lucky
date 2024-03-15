<?php
namespace Lucky\Setup;

use Lucky\Api\Api;
use Lucky\Template\Template;
use Lucky\Database\Database;
use Lucky\Constants\Hook;

final class Startup {
    public function __construct() {
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
        register_uninstall_hook(__FILE__, [$this, 'uninstall']);

        add_action(Hook::PL_LOADED, [$this, 'init_plugin']);
        // add_action(Hook::WP_INIT, [$this, 'init_theme']);
    }

    public function init_plugin() {
        new Api();
        new Menu();

        new Admin();
        new Frontend();
    }

    public function init_theme() {
        new Template();
    }

    public static function init() {
        static $instance = false;
        $instance = !$instance ? new self() : $instance;

        return $instance;
    }

    public function activate() {
        // Template::create_custom_page();
        Database::create_database();
    }

    public function deactivate() {
        // Template::delete_custom_page();
    }

    public function uninstall() {
        // Template::delete_custom_page();
        Database::delete_database();
    }
}
