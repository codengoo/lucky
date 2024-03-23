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
            $this->base,
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
        return $this->resolve(function () use ($request) {
            $param = json_decode($request->get_body());

            $data = [
                'acc_name' => $param->account->name,
                'acc_num' => $param->account->number,
                'acc_bank' => $param->account->bank,
                'acc_bank_short' => $param->account->bank_short,
                'wish' => $param->wish,
                'password' => password_hash($param->password, PASSWORD_BCRYPT),
                'image' => $param->image,
                'link' => $param->link
            ];

            $id = Database::add_data($data);
            
            return $id;
        });
    }

    public function get() {
        return $this->resolve(function () {
            $data = Database::get_all_data();

            return $data;
        });
    }

    public function remove($request) {
        return $this->resolve(function () use ($request) {
            $param = json_decode($request->get_body());
            $id = Database::delete_data($param->id);

            return $id;
        });
    }
}
