<?php

namespace Lucky\Template;

use Lucky\Constants\Hook;

class Template {
    public function __construct() {
        add_filter(Hook::TM_INCLUDE, [$this, 'filter_template']);
    }

    static function create_custom_page() {
        $page = get_page_by_path('lucky');
        if (!$page) {
            wp_insert_post(array(
                'post_title'    => 'Lucky Page Theme',
                'post_type'     => 'page',
                'post_name'     => 'lucky',
                'post_status'   => 'publish',
                'post_content'  => ''
            ));
        }
    }

    static function delete_custom_page() {
        $page = get_page_by_path('lucky');

        if ($page) {
            wp_delete_post($page->ID, true);
        }
    }

    function filter_template($template) {
        if (is_page('lucky')) {
            $custom_template = plugin_dir_path(__FILE__) . 'template_theme.php';
            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }

    static function create_message_page($title, $password, $data) {
        $new_post = array(
            'post_title'    => $title,
            'post_content'  => json_encode($data),
            'post_status'   => 'publish',
            'post_type'     => 'post',
            'post_password' => $password,
            'post_name'     => 'lucky/' . uniqid(),
        );

        $post_id = wp_insert_post($new_post);
        $post_url = get_permalink($post_id);

        return $post_url;
    }
}
