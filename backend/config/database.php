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
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            // Local Windows Development (XAMPP / Laragon / Native MySQL)
            $this->host = '127.0.0.1';
            $this->port = '3306';
            $this->db_name = 'aakashaquatech';
            $this->username = 'root';
            $this->password = '';
        } else {
            // Production Linux Server
            $this->host = 'localhost';
            $this->port = '3306';
            $this->db_name = 'aakashaquatech';
            $this->username = 'root';
            $this->password = '';
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
