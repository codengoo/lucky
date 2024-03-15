<?php

// View full hook reference at https://developer.wordpress.org/reference/hooks/

namespace Lucky\Constants;

class Hook {
    const AD_MENU = "admin_menu";
    const AD_ENQUEUE_SCRIPT = "admin_enqueue_scripts";

    const PL_LOADED = "plugins_loaded";

    const WP_INIT = "init";
    const WP_ENQUEUE_SCRIPT = "wp_enqueue_scripts";

    const TM_INCLUDE = "template_include";

    const REST_API_INIT = "rest_api_init";
}