<?php
require_once dirname(__DIR__) . '/bootstrap.php';

$appConfig = require dirname(__DIR__) . '/config/app.php';

success_response([
    'company' => $appConfig['name'],
    'tagline' => $appConfig['tagline'],
    'phone' => $appConfig['contact']['phone'],
    'email' => $appConfig['contact']['email'],
    'address' => $appConfig['contact']['address'],
    'workingHours' => $appConfig['contact']['hours'],
    'stats' => [
        ['label' => 'Industrial & Commercial Plants', 'value' => '650+'],
        ['label' => 'Total Purified Liters / Day', 'value' => '50M+'],
        ['label' => 'Service Response Time', 'value' => '< 4 Hrs'],
        ['label' => 'Client Satisfaction Rate', 'value' => '99.4%']
    ]
], "Site settings retrieved successfully");
