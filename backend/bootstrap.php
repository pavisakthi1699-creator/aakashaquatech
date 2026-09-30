<?php
/**
 * ============================================
 * Highbizz 360 | highbizz.co
 * Copyright (c) 2026 All Rights Reserved
 * ============================================
 * Aakash Aqua Tech - Bootstrap / App Loader
 * ============================================
 */

if (!defined('BASE_PATH')) {
    define('BASE_PATH', __DIR__);
}

// Error handling
error_reporting(E_ALL);
ini_set('display_errors', '0');
ini_set('log_errors', '1');

// Setup CORS
require_once __DIR__ . '/config/cors.php';

// Helpers
require_once __DIR__ . '/helpers/response.php';

// Database
require_once __DIR__ . '/config/database.php';
