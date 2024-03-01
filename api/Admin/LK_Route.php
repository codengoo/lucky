<?php

namespace Lucky\Api\Admin;

use WP_REST_Controller;

class LK_Route extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky/v1';
        $this->rest_base = 'settings';
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                'methods'             => 'GET',
                'callback'            => [$this, 'get_items'],
                'permission_callback' => '__return_true'
                // 'args'                => $this->get_collection_params()
            ]
        );
    }

    public function get_items($request) {

        return rest_ensure_response([""]);
    }

    public function get_items_permission_check($request) {
        return true;
    }

    public function get_collection_params() {
        return [];
    }
}
