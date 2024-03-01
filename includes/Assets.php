<?php

namespace Lucky\Includes;

class Assets {
    public function __construct() {
        if (is_admin()) {
            add_action("admin_enqueue_scripts", [$this, 'register'], 5);
        } else {
            add_action("wp_enqueue_scripts", [$this, 'register'], 5);
        }
    }

    public function register() {
        $this->register_scripts($this->get_scripts());
        $this->register_styles($this->get_styles());
    }

    public function register_scripts($scripts) {
        foreach ($scripts as $handle => $script) {
            $deps = isset($script['deps']) ? $script['deps'] : false;
            $in_footer = isset($script['in_footer']) ? $script['in_footer'] : false;
            $version = isset($script['version']) ? $script['version'] : WPLK_VERSION;

            wp_register_script($handle, $script['src'], $deps, $version, $in_footer);
        }
    }

    public function register_styles($styles) {
        foreach ($styles as $handle => $style) {
            $deps = isset($style['deps']) ? $style['deps'] : false;

            wp_register_style($handle, $style['src'], $deps, WPLK_VERSION);
        }
    }

    public function get_scripts() {
        $prefix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'wplk-manifest' => [
                'src'       => WPLK_PLUGIN_URL . '/assets/js/manifest.js',
                'deps'      => [],
                'version'   => \filemtime(WPLK_PLUGIN_PATH . '/assets/js/manifest.js'),
                'in_footer' => true
            ],
            'wplk-vendor' => [
                'src'       => WPLK_PLUGIN_URL . '/assets/js/vendor.js',
                'deps'      => ['wplk-manifest'],
                'version'   => \filemtime(WPLK_PLUGIN_PATH . '/assets/js/vendor.js'),
                'in_footer' => true
            ],
            'wplk-frontend' => [
                'src'       => WPLK_PLUGIN_URL . '/assets/js/frontend.js',
                'deps'      => ['jquery', 'wplk-vender'],
                'version'   => \filemtime(WPLK_PLUGIN_PATH . '/assets/js/frontend.js'),
                'in_footer' => true
            ],
        ];

        return $scripts;
    }

    public function get_styles() {
        $styles = [
            'wplk-frontend' => [
                'src' => WPLK_PLUGIN_URL . '/assets/css/frontend.css'
            ]
        ];
        return $styles;
    }
}
