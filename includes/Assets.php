<?php

namespace SharingForm\Includes;

class Assets
{
    public function __construct()
    {
        if (is_admin()) {
            add_action("admin_enqueue_scripts", [$this, 'register'], 5);
        } else {
            add_action("wp_enqueue_scripts", [$this, 'register'], 5);
        }
    }

    public function register()
    {
        $this->register_scripts($this->get_scripts());
        $this->register_styles($this->get_styles());
    }

    public function register_scripts($scripts)
    {
        foreach ($scripts as $handle => $script) {
            $deps = isset($script['deps']) ? $script['deps'] : false;
            $in_footer = isset($script['in_footer']) ? $script['in_footer'] : false;
            $version = isset($script['version']) ? $script['version'] : WPSF_VERSION;

            wp_register_script($handle, $script['src'], $deps, $version, $in_footer);
        }
    }

    public function register_styles($styles)
    {
        foreach ($styles as $handle => $style) {
            $deps = isset($style['deps']) ? $style['deps'] : false;

            wp_register_style($handle, $style['src'], $deps, WPSF_VERSION);
        }
    }

    public function get_scripts()
    {
        $prefix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '.min' : '';

        $scripts = [
            'wpsf-manifest' => [
                'src'       => WPSF_PLUGIN_URL . '/assets/js/manifest.js',
                'deps'      => [],
                'version'   => \filemtime(WPSF_PLUGIN_PATH . '/assets/js/manifest.js'),
                'in_footer' => true
            ],
            'wpsf-vendor' => [
                'src'       => WPSF_PLUGIN_URL . '/assets/js/vendor.js',
                'deps'      => ['wpsf-manifest'],
                'version'   => \filemtime(WPSF_PLUGIN_PATH . '/assets/js/vendor.js'),
                'in_footer' => true
            ],
            'wpsf-bankcard' => [
                'src'       => WPSF_PLUGIN_URL . '/assets/js/frontend/bankcard.js',
                'deps'      => ['jquery', 'wpsf-vender'],
                'version'   => \filemtime(WPSF_PLUGIN_PATH . '/assets/js/bankcard.js'),
                'in_footer' => true
            ],
            'wpsf-messagecard' => [
                'src'       => WPSF_PLUGIN_URL . '/assets/js/frontend/messagecard.js',
                'deps'      => ['jquery', 'wpsf-vender'],
                'version'   => \filemtime(WPSF_PLUGIN_PATH . '/assets/js/messagecard.js'),
                'in_footer' => true
            ],
            'wpsf-messageform' => [
                'src'       => WPSF_PLUGIN_URL . '/assets/js/frontend/messageform.js',
                'deps'      => ['jquery', 'wpsf-vender'],
                'version'   => \filemtime(WPSF_PLUGIN_PATH . '/assets/js/messageform.js'),
                'in_footer' => true
            ],
        ];

        return $scripts;
    }

    public function get_styles()
    {
        $styles = [
            'wpsf-bankcard' => [
                'src' => WPSF_PLUGIN_URL . '/assets/css/bankcard.css'
            ],
            'wpsf-messagecard' => [
                'src' => WPSF_PLUGIN_URL . '/assets/css/messagecard.css'
            ],
            'wpsf-messageform' => [
                'src' => WPSF_PLUGIN_URL . '/assets/css/messageform.css'
            ]
        ];
        return $styles;
    }
}
