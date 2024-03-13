<?php

namespace SharingForm\Api;

use WP_REST_Controller;
use SharingForm\Api\Admin\SF_Route;
use SharingForm\Api\Frontend\SF_FE_Route;

class Api extends WP_REST_Controller
{
    public function __construct()
    {
        add_action('rest_api_init', [$this, 'register_routes']);
    }

    public function register_routes()
    {
        (new SF_Route())->register_routes();
        (new SF_FE_Route())->register_routes();
    }
}
