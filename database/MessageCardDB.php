<?php

namespace SharingForm\Database;

use SharingForm\Constants\App;

if (!defined('ABSPATH'))
    define('ABSPATH', dirname(__FILE__) . '/');

class MessageCardDB
{
    public function __construct()
    {
    }

    static public function create_database()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . App::MESSAGECARDDB;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `template` text DEFAULT '',
            `message` text DEFAULT '',
            `password` text DEFAULT '',
            `acc_bank_short` text DEFAULT '',
            `link` text DEFAULT '',
            PRIMARY KEY (`id`)
          ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    static function add_data($data)
    {
        global $wpdb;

        $table_name = $wpdb->prefix . App::MESSAGECARDDB;

        $wpdb->insert(
            $table_name,
            array(
                'template' => $data['template'],
                'message' => $data['message'],
                'wish' => $data['wish'],
                'password' => $data['password'],
                'link' => $data['link'],
            )
        );

        return $wpdb->insert_id;
    }

    static function get_data($data)
    {
        global $wpdb;

        $table_name = $wpdb->prefix . App::MESSAGECARDDB;

        $result = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE id = %s",
                $data["id"]
            )
        );

        if (count($result) > 0) {
            $result = $result[0];

            if (password_verify($data['password'], $result->password)) {
                return [
                    'id' => $result->id,
                    'template' => $result->template,
                    'messahe' => $result->messahe,
                    'password' => $result->password,
                    'link' => $result->link,
                ];
            } else {
                return [];
            }
        } else {
            return [];
        }
    }


    static public function delete_database()
    {
        global $wpdb;

        $table_name = $wpdb->prefix . App::MESSAGECARDDB;

        $sql = "DROP TABLE IF EXISTS $table_name;";

        error_log($sql);
        $wpdb->query($sql);
    }
}
