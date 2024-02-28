<?php

namespace Lucky\Api\Admin;

use WP_REST_Controller;

class LK_Routing extends WP_REST_Controller {
    protected $namespace;
    protected $rest_base;

    public function __construct() {
        $this->namespace = 'lucky\v1';
        $this->rest_base = 'settings';
    }

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_items'],
                    'permission_callback' => [$this, 'get_items_permission_check'],
                    'args'                => $this->get_collection_params()
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'create_items'],
                    'permission_callback' => [$this, 'create_items_permission_check'],
                    'args'                => $this->get_endpoint_args_for_item_schema(true)
                ]
            ]
        );
    }

    public function get_items($request) {
        $response = [
            'firstname' => get_option('wpvk_settings_firstname', true),
            'lastname'  => get_option('wpvk_settings_lastname', true),
            'email'     => get_option('wpvk_settings_email', true),
        ];

        return rest_ensure_response($response);
    }

    public function get_items_permission_check($request) {
        // if( current_user_can( 'administrator' ) ) {
        //     return true;
        // }

        return true;
    }

    public function create_items_permission_check($request) {
        return true;
    }

    public function create_items($request) {

        // Data validation
        $firstname = isset($request['firstname']) ? sanitize_text_field($request['firstname']) : '';
        $lastname  = isset($request['lastname']) ? sanitize_text_field($request['lastname'])  : '';
        $email     = isset($request['email']) && is_email($request['email']) ? sanitize_email($request['email']) : '';

        // Save option data into WordPress
        update_option('wpvk_settings_firstname', $firstname);
        update_option('wpvk_settings_lastname', $lastname);
        update_option('wpvk_settings_email', $email);

        $response = [
            'firstname' => $firstname,
            'lastname'  => $lastname,
            'email'     => $email
        ];

        return rest_ensure_response($response);
    }


    public function get_collection_params() {
        return [];
    }
}
