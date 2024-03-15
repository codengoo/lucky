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
           $this->rest_base,
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
        $parameters = $request->get_body();
        $data = json_decode($parameters);
        $password =  $data->password;

        error_log(print_r($data, true));

        $data = array(
            'from' => $data->from,
            'to' => $data->to,
            'message' => $data->message,
            'image' => $data->image,
            'store' => $data->store
        );

        $link = Template::create_message_page("Lời nhắn từ " . $data['from'], $password, $data);

        return rest_ensure_response([
            'link' => $link,
            'ok' => false
        ]);
    }
}
