<?php

namespace Lucky\Api\Admin;

require_once(ABSPATH . 'wp-admin/includes/image.php');
require_once(ABSPATH . 'wp-admin/includes/file.php');
require_once(ABSPATH . 'wp-admin/includes/media.php');

use Lucky\Api\BaseApi;
use ErrorException;

final class Assets extends BaseApi {
    public function __construct() {
        parent::__construct("/assets");
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            $this->base,
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'add'],
                    'permission_callback' => [$this, 'is_admin']
                ]
            ]
        );

        register_rest_route(
            $this->namespace,
            $this->base . '/canvas',
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'addCanvas'],
                    'permission_callback' => [$this, 'is_admin']
                ]
            ]
        );
    }

    public function add($request) {
        return $this->resolve(function () {
            $attachment_id = media_handle_upload('image_upload', 0);
            if (is_wp_error($attachment_id)) {
                throw new ErrorException($attachment_id->get_error_message(), 1);
            } else {
                $image_url = wp_get_attachment_url($attachment_id);
                return $image_url;
            }
        });
    }

    private function decode_img(string $data) {
        $img = str_replace('data:image/png;base64,', '', $data);
        return base64_decode($img);
    }

    private function generate_file_path() {
        $hash = uniqid();
        $upload_dir = wp_upload_dir();
        $filename = 'canvas_' . $hash . '.png';
        $unique_filename = wp_unique_filename($upload_dir['path'], $filename);

        return [
            'path' => $upload_dir['path'] . '/' . $unique_filename,
            'url' => $upload_dir['url'] . '/' . $unique_filename,
            'filename' => $unique_filename
        ];
    }

    public function addCanvas($request) {
        return $this->resolve(function () use ($request) {
            $param = json_decode($request->get_body());
            $img = $this->decode_img($param->data);
            $file = $this->generate_file_path();

            file_put_contents($file['path'], $img);
            $attachment = [
                'guid'           => $file['url'],
                'post_title'     => $file['filename'],
                'post_content'   => '',
                'post_mime_type' => 'image/png',
                'post_status'    => 'inherit'
            ];

            $attachment_id = wp_insert_attachment($attachment, $file);
            if (is_wp_error($attachment_id)) {
                $attach_data = wp_generate_attachment_metadata($attachment_id, $file);
                wp_update_attachment_metadata($attachment_id, $attach_data);

                return $file['url'];
            } else {
                throw new ErrorException($attachment_id->get_error_message());
            }
        });
    }
}
