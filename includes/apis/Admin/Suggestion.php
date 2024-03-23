<?php

namespace Lucky\Api\Admin;

use Lucky\Api\BaseApi;

class Suggestion extends BaseApi {
    public function __construct() {
        parent::__construct("/suggestion");
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
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [$this, 'remove'],
                    'permission_callback' => [$this, 'is_admin']
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get'],
                    'permission_callback' => [$this, 'is_admin']
                ]
            ]
        );
    }

    public function add($request) {
        return $this->resolve(function () use ($request) {
            $param = json_decode($request->get_body());
            $data = $param->value;

            $prev = get_option("wplk_wish_suggestion");
            update_option("wplk_wish_suggestion", $prev . $data . ';');

            return;
        });
    }

    public function remove($request) {
        return $this->resolve(function () use ($request) {
            $param = json_decode($request->get_body());
            $data = $param->value;

            $prev = get_option("wplk_wish_suggestion");
            $prev = explode(";", $prev);

            $now = [];
            for ($i = 0; $i < count($prev); $i++) {
                if ($prev[$i] != $data)
                    array_push($now, $prev[$i]);
            };

            update_option("wplk_wish_suggestion", join(";", $now));
            return;
        });
    }

    public function get() {
        return $this->resolve(function () {
            $prev = get_option("wplk_wish_suggestion");
            $prev = explode(";", $prev);

            return  count($prev) == 1
                ? []
                : array_slice($prev, 0, count($prev) - 1);
        });
    }
}
