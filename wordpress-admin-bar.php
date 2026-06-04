<?php
/**
 * Admin Bar para Frontend Next.js
 * 
 * Agregar este código al functions.php del tema WordPress activo
 * o crear un mu-plugin en wp-content/mu-plugins/aj-admin-bar.php
 * 
 * Proporciona:
 * 1. Endpoint REST para verificar si el usuario está logueado
 * 2. Headers CORS para permitir requests desde el frontend Next.js
 */

// =============================================
// 1. Endpoint REST: /wp-json/aj/v1/auth-check
// =============================================
add_action('rest_api_init', function () {
    register_rest_route('aj/v1', '/auth-check', [
        'methods'  => 'GET',
        'callback' => 'aj_auth_check_handler',
        'permission_callback' => '__return_true',
    ]);
});

function aj_auth_check_handler($request) {
    if (!is_user_logged_in()) {
        return new WP_REST_Response([
            'authenticated' => false,
        ], 200);
    }

    $user = wp_get_current_user();
    
    // Solo mostrar barra para administradores y editores
    if (!in_array('administrator', $user->roles) && !in_array('editor', $user->roles)) {
        return new WP_REST_Response([
            'authenticated' => false,
        ], 200);
    }

    return new WP_REST_Response([
        'authenticated' => true,
        'user' => [
            'id'     => $user->ID,
            'name'   => $user->display_name,
            'roles'  => $user->roles,
        ],
        'adminUrl' => admin_url(),
    ], 200);
}

// =============================================
// 2. CORS Headers para el frontend Next.js
// =============================================
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        
        // Dominios permitidos (agregar los que correspondan)
        $allowed_origins = [
            'https://aprendiendojuntos.ec',     // Producción
            'https://adminaj.totemmassmedia.com', // Backend producción
            'http://aprendiendo-juntos.local',  // Backend desarrollo
            'http://localhost:3000',             // Desarrollo local Next.js
            'http://127.0.0.1:3000',            // Desarrollo local alternativo
        ];

        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: GET, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');
        }

        // Manejar preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(200);
            exit();
        }

        return $value;
    });
});

// =============================================
// 3. (Opcional) Desactivar la barra de admin 
//    nativa de WordPress en el frontend
//    ya que usamos nuestra propia barra
// =============================================
// add_filter('show_admin_bar', '__return_false');
