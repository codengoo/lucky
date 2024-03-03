<?php

/**
 * Plugin Name: Lucky Plugin
 * Plugin URI: https://github.com/codengoo/lucky
 * Description: Make beautiful lucky cards
 * Version: 1.0.0
 * Author: Nghiacangao
 * Author URI: https://github.com/codengoo
 * License: GPL v3
 * Text-Domain: textdomain
 */


// Prevent public user to directly access file through URL. 
// https://stackoverflow.com/questions/43212340
if (!defined("ABSPATH")) exit;

require_once 'vendor/autoload.php';

use Lucky\Includes\Admin;
use Lucky\Includes\Frontend;
use Lucky\Api\Api;
use Lucky\Template\Template;
use Lucky\Constants\Hook;
use Lucky\Constants\App;

final class LK_Kickstart {
    public function __construct() {
        $this->set_constants();
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);

        add_action(Hook::PL_LOADED, [$this, 'init_plugin']);
        add_action(Hook::WP_INIT, [$this, 'init_plugin_theme']);
    }

    public function set_constants() {
        define('WPLK_VERSION', App::VERSION);
        define('WPLK_NONCE', App::NONCE);
        define('WPLK_PLUGIN_PATH', trailingslashit(plugin_dir_path(__FILE__))); 
        define('WPLK_PLUGIN_URL', trailingslashit(plugins_url('', __FILE__)));
    }

    public function init_plugin() {
        new Admin();
        // new Api();
        new Frontend();
    }

    public function init_plugin_theme() {
        new Template();
      
    }

    // Singleton pattern
    public static function init() {
        static $instance = false;

        if (!$instance) {
            $instance = new self();
        }

        return $instance;
    }

    public function activate() {
        Template::create_custom_page();

        if (get_option('wplk_is_installed')) {
            update_option("wplk_is_installed", time());
        }

        return true;
    }

    public function deactivate() {
        Template::delete_custom_page();

        if (get_option('wplk_is_installed')) {
            update_option("wplk_is_installed", null);
        }

        return true;
    }
}

function wplk_kickstart() {
    return LK_Kickstart::init();
}

wplk_kickstart();
