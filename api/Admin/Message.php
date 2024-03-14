<?php

namespace Lucky\Api\Admin;

use WP_REST_Controller;
use Lucky\Template\Template;

class Message extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky/v1';
        $this->rest_base = 'message';
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'add'],
                ]
            ]
        );
    }

    public function add($request) {
        $parameters = $request->get_body();
        $data = json_decode($parameters);
        $password =  $data->password;

        $data = array(
            'from' => $data->from,
            'to' => $data->to,
            'message' => $data->message,
            'image' => $data->image,
        );

        $link = Template::create_message_page("Lời nhắn từ " . $data['from'], $password, $data);

        return rest_ensure_response([
            'link' => $link,
            'ok' => false
        ]);
    }
}
