<?php
require_once dirname(__DIR__) . '/bootstrap.php';

$services = [
    [
        'id' => 'water-audit',
        'title' => 'Comprehensive Water Testing & Audit',
        'shortDesc' => 'In-depth laboratory analysis of raw water parameters (TDS, Hardness, Iron, Silica, Microbial count) to design optimal treatment schemes.',
        'badge' => 'Complimentary with Plant Setup'
    ],
    [
        'id' => 'custom-engineering',
        'title' => 'Custom RO & Water Plant Fabrication',
        'shortDesc' => 'Precision manufacturing of skid-mounted reverse osmosis and filtration plants customized for your flow rate and water inlet salinity.',
        'badge' => 'ISO Certified Fabrication'
    ],
    [
        'id' => 'amc-maintenance',
        'title' => 'Annual Maintenance Contracts (AMC)',
        'shortDesc' => 'Preventive maintenance, CIP chemical cleaning, filter media recharging, membrane replacement, and guaranteed 4-hour breakdown support.',
        'badge' => '24/7 Breakdown Assistance'
    ],
    [
        'id' => 'effluent-sewage',
        'title' => 'STP & ETP Wastewater Recycling',
        'shortDesc' => 'Turnkey design and commissioning of Sewage and Effluent Treatment Plants with zero discharge compliance for industries and high-rises.',
        'badge' => 'Pollution Board Compliant'
    ]
];

success_response($services, "Services retrieved successfully");
