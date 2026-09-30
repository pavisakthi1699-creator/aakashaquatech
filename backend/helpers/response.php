<?php
/**
 * Response Helper Functions
 */

function json_response($data, $statusCode = 200)
{
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function success_response($data = [], $message = "Success", $statusCode = 200)
{
    json_response([
        'success' => true,
        'message' => $message,
        'data' => $data,
        'timestamp' => date('c')
    ], $statusCode);
}

function error_response($message = "An error occurred", $statusCode = 400, $errors = [])
{
    json_response([
        'success' => false,
        'message' => $message,
        'errors' => $errors,
        'timestamp' => date('c')
    ], $statusCode);
}
