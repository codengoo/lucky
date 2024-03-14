<?php

namespace Lucky\Api\Admin;

use WP_REST_Controller;

class Assets extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky/v1';
        $this->rest_base = 'asset';
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'add'],
                ]
            ]
        );
    }

    public function add($request) {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        $attachment_id = media_handle_upload('image_upload', 0);

        if (is_wp_error($attachment_id)) {
            return rest_ensure_response([
                'link' => '',
                'ok' => false
            ]);
        } else {
            $image_url = wp_get_attachment_url($attachment_id);
            return rest_ensure_response([
                'link' => $image_url,
                'ok' => true
            ]);
        }

        return rest_ensure_response([
            'link' => '',
            'ok' => false
        ]);
    }
}
