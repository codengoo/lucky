<?php

namespace SharingForm\Api\Admin;

use SharingForm\Database\BankCardDB;
use WP_REST_Controller;

class SF_Route extends WP_REST_Controller
{
    protected $namespace;
    protected $rest_base;

    public function __construct()
    {
        $this->namespace = 'sharingform/v1';
        $this->rest_base = 'create';
    }

    public function register_routes()
    {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                'methods'             => 'POST',
                'callback'            => [$this, 'save_card'],
            ]
        );
    }

    public function save_card($request)
    {
        $parameters = $request->get_body();
        $data = json_decode($parameters);

        $data = array(
            'acc_name' => $data->account->acc_name,
            'acc_num' => $data->account->acc_number,
            'acc_bank' => $data->account->bank,
            'acc_bank_short' => $data->account->bank_short,
            'wish' => $data->wish,
            'password' => password_hash($data->password, PASSWORD_BCRYPT),
            'image' => $data->image,
            'link' => $data->link,
        );

        $id = BankCardDB::add_data($data);

        $response = [
            'link' => $id,
            'ok' => true
        ];

        return rest_ensure_response($response);
    }

    public function get_items_permission_check($request)
    {
        return true;
    }
}
