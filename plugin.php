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

final class LK_Kickstart {
    const VERSION = '1.0.0';
    const NONCE = 'b?le*;K7.T2jk_*(+3&[G[xAc8O~Fv)2T/Zk9N:GKBkn$piN0.N%N~X91VbCn@.4';

    public function __construct() {
        $this->plugin_constants();
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
        add_action('plugins_loaded', [$this, 'init_plugin']);
    }

    public function plugin_constants() {
        define('WPLK_VERSION', self::VERSION);
        define('WPLK_NONCE', self::NONCE);
        define('WPLK_PLUGIN_PATH', trailingslashit(plugin_dir_path(__FILE__))); // file path
        define('WPLK_PLUGIN_URL', trailingslashit(plugins_url('', __FILE__))); // url path
    }

    public function init_plugin() {
        new Admin();
        new Frontend();
        new Api();
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
        $is_installed = get_option('wplk_is_installed');

        if (!$is_installed) {
            update_option("wplk_is_installed", time());
        }

        return $is_installed;
    }

    public function deactivate() {
        $is_installed = get_option('wplk_is_installed');

        if ($is_installed) {
            update_option("wplk_is_installed", null);
        }

        return $is_installed;
    }
}

function wplk_kickstart() {
    return LK_Kickstart::init();
}

wplk_kickstart();
