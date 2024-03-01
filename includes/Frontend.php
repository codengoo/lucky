<?php

namespace Lucky\Includes;

class Frontend {
    public function __construct() {
        add_shortcode('wplk-app', [$this, 'render_frontend']);
    }

    public function render_frontend($atts, $content) {
        // wp_enqueue_style('wplk-frontend');
        wp_enqueue_script('wplk-frontend');

        $content .= '<div id="wplk-frontend-app"></div>';

        return $content;
    }
}
