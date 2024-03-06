<?php

namespace Lucky\Api\Frontend;

use Lucky\Database\Database;
use WP_REST_Controller;

class LK_FE_Route extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky/v1';
        $this->rest_base = 'get';
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                'methods'             => 'GET',
                'callback'            => [$this, 'get_card'],
            ]
        );
    }

    public function get_card($request) {
        $data = array(
            'password' => $request['password'],
            'id' => $request['id'],
        );

        $data = Database::get_data($data);

        return rest_ensure_response($data);
    }

    public function get_items_permission_check($request) {
        return true;
    }
}
