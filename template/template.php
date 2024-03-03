<?php

namespace Lucky\Template;

class Template {
    public function __construct() {
        $this->create_custom_page();
        add_filter('template_include', [$this, 'my_plugin_custom_template']);
    }

    function create_custom_page() {
        $page = get_page_by_path('lucky');

        if (!$page) {
            $page_id = wp_insert_post(array(
                'post_title'    => 'My Dynamic Page',
                'post_type'     => 'page',
                'post_name'     => 'lucky',
                'post_status'   => 'publish',
                'post_content'  => ''
            ));
        }
    }

    function my_plugin_custom_template($template) {
        if (is_page('lucky')) {
            $custom_template = plugin_dir_path(__FILE__) . 'template_theme.php';
            error_log($custom_template);
            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }
}
