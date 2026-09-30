<?php
/**
 * Admin API Controller - Aakash Aqua Tech
 * Product Management (CRUD: Create, Read, Update, Delete)
 */

require_once dirname(__DIR__) . '/bootstrap.php';

$jsonPath = dirname(__DIR__) . '/data/products.json';

function getProducts($path) {
    if (!file_exists($path)) return [];
    $data = json_decode(file_get_contents($path), true);
    return is_array($data) ? $data : [];
}

function saveProducts($path, $products) {
    $dir = dirname($path);
    if (!file_exists($dir)) @mkdir($dir, 0777, true);
    
    // Save to backend/data/products.json
    $res = file_put_contents($path, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    
    // Also sync to frontend src/data/products.json if available
    $frontendPath = dirname(dirname(__DIR__)) . '/src/data/products.json';
    if (file_exists(dirname($frontendPath))) {
        @file_put_contents($frontendPath, json_encode($products, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    }
    
    return $res !== false;
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? 'list';

// Get JSON body if available
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?: [];

// Combine GET, POST and Body
$requestData = array_merge($_GET, $_POST, $body);

switch ($action) {
    case 'stats':
        $products = getProducts($jsonPath);
        $total = count($products);
        $inStock = count(array_filter($products, fn($p) => !empty($p['inStock'])));
        $outOfStock = $total - $inStock;
        $featured = count(array_filter($products, fn($p) => !empty($p['featured'])));
        
        $categories = [];
        foreach ($products as $p) {
            $cat = $p['category'] ?? 'Uncategorized';
            $categories[$cat] = ($categories[$cat] ?? 0) + 1;
        }

        success_response([
            'total' => $total,
            'inStock' => $inStock,
            'outOfStock' => $outOfStock,
            'featured' => $featured,
            'categoriesCount' => count($categories),
            'categories' => $categories
        ], "Admin statistics retrieved");
        break;

    case 'list':
    case 'products':
        $products = getProducts($jsonPath);
        
        $search = trim(strtolower($requestData['search'] ?? ''));
        $category = trim($requestData['category'] ?? '');
        $status = trim($requestData['status'] ?? ''); // 'in_stock', 'out_of_stock'

        if ($search !== '') {
            $products = array_values(array_filter($products, function($p) use ($search) {
                return strpos(strtolower($p['name'] ?? ''), $search) !== false ||
                       strpos(strtolower($p['sku'] ?? ''), $search) !== false ||
                       strpos(strtolower($p['id'] ?? ''), $search) !== false;
            }));
        }

        if ($category !== '' && $category !== 'all') {
            $catLower = strtolower($category);
            $products = array_values(array_filter($products, function($p) use ($catLower) {
                return strtolower($p['category'] ?? '') === $catLower;
            }));
        }

        if ($status === 'in_stock') {
            $products = array_values(array_filter($products, fn($p) => !empty($p['inStock'])));
        } else if ($status === 'out_of_stock') {
            $products = array_values(array_filter($products, fn($p) => empty($p['inStock'])));
        }

        $page = max(1, intval($requestData['page'] ?? 1));
        $limit = intval($requestData['limit'] ?? 20);
        $total = count($products);

        if ($limit > 0) {
            $offset = ($page - 1) * $limit;
            $items = array_slice($products, $offset, $limit);
            json_response([
                'success' => true,
                'data' => $items,
                'pagination' => [
                    'total' => $total,
                    'page' => $page,
                    'limit' => $limit,
                    'pages' => ceil($total / $limit)
                ]
            ]);
        } else {
            success_response($products, "All products retrieved");
        }
        break;

    case 'create':
        if ($method !== 'POST') error_response("Method must be POST", 405);
        
        $name = trim($requestData['name'] ?? '');
        if (empty($name)) {
            error_response("Product name is required", 422);
        }

        $products = getProducts($jsonPath);
        
        $newId = (string)(time() . rand(100, 999));
        $newProduct = [
            'id' => $newId,
            'name' => $name,
            'slug' => strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name)),
            'type' => $requestData['type'] ?? 'simple',
            'sku' => trim($requestData['sku'] ?? 'AAT-' . strtoupper(substr(md5($newId), 0, 6))),
            'category' => trim($requestData['category'] ?? 'Industrial RO'),
            'categories' => !empty($requestData['categories']) ? (is_array($requestData['categories']) ? $requestData['categories'] : explode(',', $requestData['categories'])) : [$requestData['category'] ?? 'Industrial RO'],
            'regularPrice' => floatval($requestData['regularPrice'] ?? 0),
            'salePrice' => floatval($requestData['salePrice'] ?? 0),
            'minPrice' => floatval($requestData['regularPrice'] ?? 0),
            'maxPrice' => floatval($requestData['regularPrice'] ?? 0),
            'inStock' => isset($requestData['inStock']) ? (bool)$requestData['inStock'] : true,
            'stock' => intval($requestData['stock'] ?? 10),
            'featured' => !empty($requestData['featured']),
            'published' => true,
            'mainImage' => trim($requestData['mainImage'] ?? 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80'),
            'images' => !empty($requestData['images']) ? (is_array($requestData['images']) ? $requestData['images'] : [$requestData['mainImage']]) : [$requestData['mainImage'] ?? ''],
            'shortDescription' => trim($requestData['shortDescription'] ?? ''),
            'description' => trim($requestData['description'] ?? ''),
            'attributes' => $requestData['attributes'] ?? [],
            'variationsCount' => 0,
            'variations' => [],
            'createdAt' => date('c'),
            'updatedAt' => date('c')
        ];

        array_unshift($products, $newProduct);
        saveProducts($jsonPath, $products);

        success_response($newProduct, "Product created successfully", 201);
        break;

    case 'update':
        $id = trim($requestData['id'] ?? '');
        if (empty($id)) error_response("Product ID is required", 422);

        $products = getProducts($jsonPath);
        $foundIndex = -1;
        foreach ($products as $idx => $p) {
            if ((string)$p['id'] === (string)$id) {
                $foundIndex = $idx;
                break;
            }
        }

        if ($foundIndex === -1) {
            error_response("Product with ID $id not found", 404);
        }

        // Merge updates
        $existing = $products[$foundIndex];
        if (isset($requestData['name'])) $existing['name'] = trim($requestData['name']);
        if (isset($requestData['sku'])) $existing['sku'] = trim($requestData['sku']);
        if (isset($requestData['category'])) $existing['category'] = trim($requestData['category']);
        if (isset($requestData['regularPrice'])) $existing['regularPrice'] = floatval($requestData['regularPrice']);
        if (isset($requestData['salePrice'])) $existing['salePrice'] = floatval($requestData['salePrice']);
        if (isset($requestData['inStock'])) $existing['inStock'] = (bool)$requestData['inStock'];
        if (isset($requestData['stock'])) $existing['stock'] = intval($requestData['stock']);
        if (isset($requestData['featured'])) $existing['featured'] = (bool)$requestData['featured'];
        if (isset($requestData['mainImage'])) $existing['mainImage'] = trim($requestData['mainImage']);
        if (isset($requestData['shortDescription'])) $existing['shortDescription'] = trim($requestData['shortDescription']);
        if (isset($requestData['description'])) $existing['description'] = trim($requestData['description']);
        $existing['updatedAt'] = date('c');

        $products[$foundIndex] = $existing;
        saveProducts($jsonPath, $products);

        success_response($existing, "Product updated successfully");
        break;

    case 'delete':
        $id = trim($requestData['id'] ?? '');
        if (empty($id)) error_response("Product ID is required", 422);

        $products = getProducts($jsonPath);
        $initialCount = count($products);
        $products = array_values(array_filter($products, fn($p) => (string)$p['id'] !== (string)$id));

        if (count($products) === $initialCount) {
            error_response("Product not found", 404);
        }

        saveProducts($jsonPath, $products);
        success_response(['id' => $id], "Product deleted successfully");
        break;

    case 'toggle':
        $id = trim($requestData['id'] ?? '');
        $field = trim($requestData['field'] ?? ''); // 'inStock' or 'featured'
        
        if (empty($id) || !in_array($field, ['inStock', 'featured'])) {
            error_response("Invalid toggle request", 422);
        }

        $products = getProducts($jsonPath);
        foreach ($products as &$p) {
            if ((string)$p['id'] === (string)$id) {
                $p[$field] = empty($p[$field]);
                $p['updatedAt'] = date('c');
                saveProducts($jsonPath, $products);
                success_response($p, "Toggled $field successfully");
            }
        }
        error_response("Product not found", 404);
        break;

    default:
        error_response("Unknown action: $action", 400);
}
