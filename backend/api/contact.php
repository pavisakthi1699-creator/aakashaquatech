<?php
require_once dirname(__DIR__) . '/bootstrap.php';
require_once dirname(__DIR__) . '/models/Inquiry.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_response("Method Not Allowed. Use POST.", 405);
}

// Support both JSON body and multipart/form-data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$email = trim($input['email'] ?? '');
$serviceType = trim($input['serviceType'] ?? $input['service_type'] ?? 'General Inquiry');
$waterSource = trim($input['waterSource'] ?? $input['water_source'] ?? 'Borewell / Ground Water');
$message = trim($input['message'] ?? '');

$errors = [];
if (empty($name)) {
    $errors['name'] = "Name is required";
}
if (empty($phone)) {
    $errors['phone'] = "Phone number is required";
}

if (!empty($errors)) {
    error_response("Validation failed. Please correct the highlighted errors.", 422, $errors);
}

$db = (new Database())->getConnection();
$inquiryModel = new Inquiry($db);

$inquiryId = $inquiryModel->create([
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'service_type' => $serviceType,
    'water_source' => $waterSource,
    'message' => $message
]);

success_response([
    'inquiry_id' => $inquiryId,
    'received' => [
        'name' => $name,
        'phone' => $phone,
        'service_type' => $serviceType
    ]
], "Thank you! Your inquiry has been submitted. Our water engineer will contact you within 2 hours.");
