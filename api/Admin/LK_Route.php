<?php

namespace Lucky\Api\Admin;

use Lucky\Database\Database;
use WP_REST_Controller;

class LK_Route extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky/v1';
        $this->rest_base = 'card';
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
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get'],
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [$this, 'remove'],
                ]
            ]
        );
    }

    public function add($request) {
        $parameters = $request->get_body();
        $data = json_decode($parameters);

        $data = array(
            'acc_name' => $data->account->name,
            'acc_num' => $data->account->number,
            'acc_bank' => $data->account->bank,
            'acc_bank_short' => $data->account->bank_short,
            'wish' => $data->wish,
            'password' => password_hash($data->password, PASSWORD_BCRYPT),
            'image' => $data->image,
            'link' => $data->link,
        );

        $id = Database::add_data($data);

        $response = [
            'link' => $id,
            'ok' => true
        ];

        return rest_ensure_response($response);
    }

    public function get() {
        $data = Database::get_all_data();

        $response = [
            'data' => $data,
            'ok' => true
        ];

        return rest_ensure_response($response);
    }

    public function remove($request) {
        $parameters = $request->get_body();
        $data = json_decode($parameters);

        $data = Database::delete_data($data->id);

        $response = [
            'data' => $data,
            'ok' => true
        ];

        return rest_ensure_response($response);
    }
}
