<?php

namespace Lucky\Api\Admin;

use WP_REST_Controller;

class Suggestion extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky/v1';
        $this->rest_base = 'suggestion';
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'add'],
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [$this, 'remove'],
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get'],
                ]
            ]
        );
    }

    public function add($request) {
        $parameters = $request->get_body();
        $data = json_decode($parameters);

        $data = $data->value;
        $prev = get_option("wplk_wish_suggestion");

        update_option("wplk_wish_suggestion", $prev . $data . ';');
        return;
    }

    public function remove($request) {
        $parameters = $request->get_body();
        $data = json_decode($parameters);

        $data = $data->value;
        $prev = get_option("wplk_wish_suggestion");
        $prev = explode(";", $prev);

        $now = [];
        for ($i = 0; $i < count($prev); $i++) {
            if ($prev[$i] != $data)
                array_push($now, $prev[$i]);
        };

        update_option("wplk_wish_suggestion", join(";", $now));
        return;
    }

    public function get() {
        $prev = get_option("wplk_wish_suggestion");
        $prev = explode(";", $prev);
        if (count($prev) == 1) {
            return rest_ensure_response([]);
        } else {
            return rest_ensure_response(array_slice($prev, 0, count($prev) - 1));
        }
    }
}
