<?php

namespace Lucky\Api;

use WP_REST_Controller;
use Lucky\Api\Admin\LK_Route;
use Lucky\Api\Frontend\LK_FE_Route;

class Api extends WP_REST_Controller {
    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes() {
        (new LK_Route())->register_routes();
        (new LK_FE_Route())->register_routes();
    }
}
