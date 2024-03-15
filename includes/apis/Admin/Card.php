<?php

namespace Lucky\Api\Admin;

use Lucky\Api\BaseApi;
use Lucky\Database\Database;

final class Card extends BaseApi {
    public function __construct() {
        parent::__construct("/card");
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'add'],
                    'permission_callback' => [$this, 'is_admin']
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get'],
                    'permission_callback' => [$this, 'is_admin']
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [$this, 'remove'],
                    'permission_callback' => [$this, 'is_admin']
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
