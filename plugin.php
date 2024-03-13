<?php

/**
 * Plugin Name: Sharing Form Plugin
 * Plugin URI: https://github.com/codengoo/sharingform
 * Description: Make beautiful cards by sharing form
 * Version: 1.0.0
 * Author: Nghiacangao
 * Author URI: https://github.com/codengoo
 * License: GPL v3
 * Text-Domain: textdomain
 */


// Prevent public user to directly access file through URL
if (!defined("ABSPATH")) exit;

require_once 'vendor/autoload.php';

use SharingForm\Includes\Admin;
use SharingForm\Includes\BankCard;
use SharingForm\Includes\MessageForm;
use SharingForm\Includes\MessageCard;
use SharingForm\Api\Api;
use SharingForm\Template\Template;
use SharingForm\Database\BankCardDB;
use SharingForm\Database\MessageCardDB;
use SharingForm\Constants\Hook;
use SharingForm\Constants\App;

final class SF_Kickstart
{
    public function __construct()
    {
        $this->set_constants();
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);

        add_action(Hook::PL_LOADED, [$this, 'init_plugin']);
        add_action(Hook::WP_INIT, [$this, 'init_plugin_theme']);
    }

    public function set_constants()
    {
        define('WPSF_VERSION', App::VERSION);
        define('WPSF_NONCE', App::NONCE);
        define('WPSF_PLUGIN_PATH', trailingslashit(plugin_dir_path(__FILE__)));
        define('WPSF_PLUGIN_URL', trailingslashit(plugins_url('', __FILE__)));
    }

    public function init_plugin()
    {
        new Admin();
        new Api();
        new BankCard();
        new MessageCard();
        new MessageForm();
    }

    public function init_plugin_theme()
    {
        new Template();
    }

    public static function init()
    {
        static $instance = false;

        if (!$instance) {
            $instance = new self();
        }

        return $instance;
    }

    public function activate()
    {
        Template::create_custom_page();
        BankCardDB::create_database();
        MessageCardDB::create_database();

        if (get_option('wpsf_is_installed')) {
            update_option("wpsf_is_installed", time());
        }

        return true;
    }

    public function deactivate()
    {
        Template::delete_custom_page();
        BankCardDB::delete_database();
        MessageCardDB::delete_database();

        if (get_option('wpsf_is_installed')) {
            update_option("wpsf_is_installed", null);
        }

        return true;
    }
}

function wpsf_kickstart()
{
    return SF_Kickstart::init();
}

wpsf_kickstart();
