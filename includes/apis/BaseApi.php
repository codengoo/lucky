<?php

namespace Lucky\Api;

use Lucky\Constants\Role;
use WP_REST_Controller;

abstract class BaseApi extends WP_REST_Controller {
    public $namespace;
    public $base;

    public function __construct(string $base = '') {
        $this->namespace = 'lucky/v1';
        $this->base = $base;
    }

    public function is_admin() {
        return current_user_can(Role::ADMIN);
    }

    public function resolve(callable $callback) {
        try {
            return rest_ensure_response([
                'data' => $callback(),
                'ok' => true
            ]);
        } catch (\Throwable $th) {
            return rest_ensure_response([
                'ok' => false,
                'message' => $th->getMessage()
            ]);
        }
    }
}
