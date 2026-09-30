<?php
require_once dirname(__DIR__) . '/bootstrap.php';

$jsonPath = dirname(__DIR__) . '/data/products.json';
$products = [];

if (file_exists($jsonPath)) {
    $products = json_decode(file_get_contents($jsonPath), true);
    if (!is_array($products)) $products = [];
}

$category = isset($_GET['category']) ? trim($_GET['category']) : null;
$search = isset($_GET['search']) ? trim(strtolower($_GET['search'])) : null;
$id = isset($_GET['id']) ? trim($_GET['id']) : null;
$featured = isset($_GET['featured']) ? $_GET['featured'] : null;

// Single product query
if ($id) {
    foreach ($products as $p) {
        if ((string)$p['id'] === (string)$id || (string)$p['slug'] === (string)$id) {
            success_response($p, "Product retrieved successfully");
        }
    }
    error_response("Product not found", 404);
}

// Filter by category
if ($category && $category !== 'all') {
    $catLower = strtolower($category);
    $products = array_values(array_filter($products, function($p) use ($catLower) {
        $itemCat = strtolower($p['category'] ?? '');
        $categories = array_map('strtolower', $p['categories'] ?? []);
        return $itemCat === $catLower || in_array($catLower, $categories) || strpos($itemCat, $catLower) !== false;
    }));
}

// Filter by search
if ($search) {
    $products = array_values(array_filter($products, function($p) use ($search) {
        $nameMatch = strpos(strtolower($p['name'] ?? ''), $search) !== false;
        $skuMatch = strpos(strtolower($p['sku'] ?? ''), $search) !== false;
        $descMatch = strpos(strtolower($p['shortDescription'] ?? ''), $search) !== false;
        return $nameMatch || $skuMatch || $descMatch;
    }));
}

// Filter by featured
if ($featured === '1' || $featured === 'true') {
    $products = array_values(array_filter($products, function($p) {
        return !empty($p['featured']);
    }));
}

$page = max(1, intval($_GET['page'] ?? 1));
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 0; // 0 means all

$total = count($products);
$categoriesList = [];

// Compute category counts
if (file_exists($jsonPath)) {
    $rawAll = json_decode(file_get_contents($jsonPath), true) ?: [];
    foreach ($rawAll as $item) {
        $cat = $item['category'] ?? 'Other';
        $categoriesList[$cat] = ($categoriesList[$cat] ?? 0) + 1;
    }
}

if ($limit > 0) {
    $offset = ($page - 1) * $limit;
    $pagedProducts = array_slice($products, $offset, $limit);
    json_response([
        'success' => true,
        'message' => 'Products retrieved successfully',
        'data' => $pagedProducts,
        'pagination' => [
            'total' => $total,
            'page' => $page,
            'limit' => $limit,
            'pages' => ceil($total / $limit)
        ],
        'categories' => $categoriesList,
        'timestamp' => date('c')
    ]);
}

json_response([
    'success' => true,
    'message' => 'Products retrieved successfully',
    'data' => $products,
    'total' => $total,
    'categories' => $categoriesList,
    'timestamp' => date('c')
]);
