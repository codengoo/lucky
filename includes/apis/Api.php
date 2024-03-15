<?php

namespace Lucky\Api;

use WP_REST_Controller;
use Lucky\Api\Frontend\LK_FE_Route;
use Lucky\Api\Admin\Card;
use Lucky\Api\Admin\Suggestion;
use Lucky\Api\Admin\Assets;
use Lucky\Api\Admin\Message;
use Lucky\Constants\Hook;

class Api extends WP_REST_Controller {
    public function __construct() {
        add_action(Hook::REST_API_INIT, [$this, 'register_routes']);
    }

    public function register_routes() {
        (new Card())->register_routes();
        (new Suggestion())->register_routes();
        (new Assets())->register_routes();
        (new Message())->register_routes();

        (new LK_FE_Route())->register_routes();
    }
}
