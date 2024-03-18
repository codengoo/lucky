<?php

namespace Lucky\Api\Admin;

use Lucky\Api\BaseApi;
use Lucky\Template\Template;

class Message extends BaseApi {
    public function __construct() {
        parent::__construct("/message");
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
                ]
            ]
        );
    }

    public function add($request) {
        return $this->resolve(function () use ($request) {
            $param = json_decode($request->get_body());
            $password =  $param->password;

            $data = [
                'from' => $param->from,
                'to' => $param->to,
                'message' => $param->message,
                'image' => $param->image,
                'store' => $param->store
            ];

            $link = Template::create_message_page("Lời nhắn từ " . $data['from'], $password, $data);

            return $link;
        });
    }
}
