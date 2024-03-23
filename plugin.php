<?php

/**
 * Plugin Name: Lucky Plugin
 * Plugin URI: https://github.com/codengoo/lucky
 * Description: Make beautiful lucky cards
 * Version: 1.0.0
 * Author: Nghiacangao
 * Author URI: https://github.com/codengoo
 * License: GPLv3
 * Text-Domain: textdomain
 */

if (!defined("ABSPATH")) exit;
require_once 'vendor/autoload.php';

use Lucky\Constants\App;
use Lucky\Setup\Startup;

function startup() {
    define('WPLK_VERSION', App::VERSION);
    define('WPLK_NONCE', App::NONCE);
    define('WPLK_PLUGIN_PATH', trailingslashit(plugin_dir_path(__FILE__)));
    define('WPLK_PLUGIN_URL', trailingslashit(plugins_url('', __FILE__)));

    return Startup::init();
}

startup();
