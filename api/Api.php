<?php

namespace WPVK\Api;

use WP_REST_Controller;
use Lucky\Api\Admin\LK_Routing;

/**
 * Rest API Handler
 */
class Api extends WP_REST_Controller {

    /**
     * Construct Function
     */
    public function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    /**
     * Register API routes
     */
    public function register_routes() {
        (new LK_Routing())->register_routes();
    }
}
