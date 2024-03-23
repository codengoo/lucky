<?php

namespace Lucky\Database;

use Lucky\Constants\App;

if (!defined('ABSPATH'))
    define('ABSPATH', dirname(__FILE__) . '/');


class Database {
    public static function table_name(): string {
        global $wpdb;
        return $wpdb->prefix . App::DATABASE;
    }

    public function __construct() {
    }

    static public function create_database() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS " . self::table_name() . " (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `acc_name` text DEFAULT '',
            `acc_num` text DEFAULT '',
            `acc_bank` text DEFAULT '',
            `acc_bank_short` text DEFAULT '',
            `wish` text DEFAULT '',
            `password` text DEFAULT '',
            `image` text DEFAULT '',
            `link` text DEFAULT '',
            PRIMARY KEY (`id`)
          ) $charset_collate";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    static public function delete_database() {
        global $wpdb;

        $sql = "DROP TABLE IF EXISTS " . self::table_name();

        $wpdb->query($sql);
    }

    static function add_data($data) {
        global $wpdb;

        $wpdb->insert(
            self::table_name(),
            array(
                'acc_name' => $data['acc_name'],
                'acc_num' => $data['acc_num'],
                'acc_bank' => $data['acc_bank'],
                'acc_bank_short' => $data['acc_bank_short'],
                'wish' => $data['wish'],
                'password' => $data['password'],
                'image' => $data['image'],
                'link' => $data['link'],
            )
        );

        return $wpdb->insert_id;
    }

    static function get_data($data) {
        global $wpdb;

        $result = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM " . self::table_name() . " WHERE id = %s",
                $data["id"]
            )
        );

        if (count($result) > 0) {
            $result = $result[0];

            if (password_verify($data['password'], $result->password)) {
                return [
                    'id' => $result->id,
                    'acc_name' => $result->acc_name,
                    'acc_num' => $result->acc_num,
                    'acc_bank' => $result->acc_bank,
                    'acc_bank_short' => $result->acc_bank_short,
                    'wish' => $result->wish,
                    'image' => $result->image,
                    'link' => $result->link,
                ];
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    static function get_all_data() {
        global $wpdb;

        $result = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT id, acc_name, acc_num, acc_bank, acc_bank_short, wish, image FROM " . self::table_name()
            )
        );

        return $result;
    }

    static function delete_data($id) {
        global $wpdb;

        $result = $wpdb->get_results(
            $wpdb->prepare(
                "DELETE FROM " . self::table_name() . " WHERE id = %s",
                $id
            )
        );

        return $result;
    }
}
