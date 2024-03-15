<?php

namespace Lucky\Api;

use Lucky\Constants\Role;
use WP_REST_Controller;

abstract class BaseApi extends WP_REST_Controller {
    protected $namespace;
    protected $base;

    protected function __construct(string $base = '') {
        $this->namespace = 'lucky/v1';
        $this->base = $base;
    }

    protected function is_admin() {
        return current_user_can(Role::ADMIN);
    }
}
