<?php

namespace SharingForm\Template;

use SharingForm\Constants\Hook;

class Template
{
    public function __construct()
    {
        add_filter(Hook::TM_INCLUDE, [$this, 'filter_template']);
    }

    static function create_custom_page()
    {
        $page = get_page_by_path('sharingform');
        if (!$page) {
            wp_insert_post(array(
                'post_title'    => 'SharingForm Page Theme',
                'post_type'     => 'page',
                'post_name'     => 'sharingform',
                'post_status'   => 'publish',
                'post_content'  => ''
            ));
        }
    }

    static function delete_custom_page()
    {
        $page = get_page_by_path('sharingform');

        if ($page) {
            wp_delete_post($page->ID, true);
        }
    }

    function filter_template($template)
    {
        if (is_page('sharingform')) {
            $custom_template = plugin_dir_path(__FILE__) . 'template_theme.php';
            if (file_exists($custom_template)) {
                return $custom_template;
            }
        }
        return $template;
    }
}
