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

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/canvas',
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'addCanvas'],
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

    public function addCanvas($request) {
        require_once(ABSPATH . 'wp-admin/includes/image.php');
        require_once(ABSPATH . 'wp-admin/includes/file.php');
        require_once(ABSPATH . 'wp-admin/includes/media.php');

        try {
            $parameters = $request->get_body();
            $data = json_decode($parameters);
            $base64_image_data = $data->data;

            $upload_dir = wp_upload_dir();
            $img = str_replace('data:image/png;base64,', '', $base64_image_data);
            $img = str_replace(' ', '+', $img);
            $decoded_img = base64_decode($img);

            $filename = 'canvas_' . uniqid() . '.png';
            $unique_filename = wp_unique_filename($upload_dir['path'], $filename);
            $file = $upload_dir['path'] . '/' . $unique_filename;

            file_put_contents($file, $decoded_img);

            $attachment = array(
                'guid'           => $upload_dir['url'] . '/' . basename($file),
                'post_mime_type' => 'image/png',
                'post_title'     => preg_replace('/\.[^.]+$/', '', basename($file)),
                'post_content'   => '',
                'post_status'    => 'inherit'
            );

            $attach_id = wp_insert_attachment($attachment, $file);

            $attach_data = wp_generate_attachment_metadata($attach_id, $file);
            wp_update_attachment_metadata($attach_id, $attach_data);

            return rest_ensure_response([
                'link' => $attachment['guid'],
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            return rest_ensure_response([
                'link' => '',
                'ok' => false
            ]);
        }
    }
}
