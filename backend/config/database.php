<?php
/**
 * Database Connection Handler
 * Supports MySQL with fallback to SQLite for zero-config local development.
 */

class Database
{
    private $host;
    private $port;
    private $db_name;
    private $username;
    private $password;
    private $conn = null;

    public function __construct()
    {
        // Default local defaults
        $this->host = 'localhost';
        $this->port = '3306';
        $this->db_name = 'aakashaquatech';
        $this->username = 'root';
        $this->password = '';

        // 1. Check custom db_credentials.php file if configured
        $credFile = __DIR__ . '/db_credentials.php';
        if (file_exists($credFile)) {
            $creds = include $credFile;
            if (is_array($creds) && !empty($creds['db_name'])) {
                $this->host = !empty($creds['host']) ? $creds['host'] : 'localhost';
                $this->port = !empty($creds['port']) ? $creds['port'] : '3306';
                $this->db_name = $creds['db_name'];
                $this->username = !empty($creds['username']) ? $creds['username'] : 'root';
                $this->password = isset($creds['password']) ? $creds['password'] : '';
                return;
            }
        }

        // 2. Auto-detect WordPress wp-config.php in parent directories
        $possibleWpConfigPaths = [
            dirname(__DIR__, 2) . '/wp-config.php', // when backend is inside public_html/backend
            dirname(__DIR__, 3) . '/wp-config.php', // when backend is inside public_html/version2.0/backend
            dirname(__DIR__, 4) . '/wp-config.php'
        ];

        foreach ($possibleWpConfigPaths as $wpConfig) {
            if (file_exists($wpConfig)) {
                $content = @file_get_contents($wpConfig);
                if ($content) {
                    if (preg_match("/define\s*\(\s*['\"]DB_NAME['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)/i", $content, $m)) {
                        $this->db_name = $m[1];
                    }
                    if (preg_match("/define\s*\(\s*['\"]DB_USER['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)/i", $content, $m)) {
                        $this->username = $m[1];
                    }
                    if (preg_match("/define\s*\(\s*['\"]DB_PASSWORD['\"]\s*,\s*['\"]([^'\"]*)['\"]\s*\)/i", $content, $m)) {
                        $this->password = $m[1];
                    }
                    if (preg_match("/define\s*\(\s*['\"]DB_HOST['\"]\s*,\s*['\"]([^'\"]+)['\"]\s*\)/i", $content, $m)) {
                        $hostParts = explode(':', $m[1]);
                        $this->host = $hostParts[0];
                        if (isset($hostParts[1])) $this->port = $hostParts[1];
                    }
                    return;
                }
            }
        }
    }

    public function getConnection()
    {
        if ($this->conn !== null) {
            return $this->conn;
        }

        // Try MySQL first
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->db_name};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_TIMEOUT => 2,
            ]);
            return $this->conn;
        } catch (PDOException $e) {
            // Fallback to SQLite so the backend runs immediately without requiring manual MySQL setup
            $sqlitePath = dirname(__DIR__) . '/database/aakashaquatech.sqlite';
            $isNew = !file_exists($sqlitePath);
            try {
                $this->conn = new PDO("sqlite:" . $sqlitePath, null, null, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);

                if ($isNew) {
                    $this->initSqliteSchema();
                }
                return $this->conn;
            } catch (Exception $ex) {
                error_log("Database connection failed: " . $ex->getMessage());
                return null;
            }
        }
    }

    private function initSqliteSchema()
    {
        $schema = "
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            phone TEXT NOT NULL,
            service_type TEXT,
            water_source TEXT,
            message TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
        ";
        $this->conn->exec($schema);
    }
}
