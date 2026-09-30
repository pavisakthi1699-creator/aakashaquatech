<?php
class Inquiry
{
    private $db;

    public function __construct($dbConnection = null)
    {
        $this->db = $dbConnection;
    }

    public function create($data)
    {
        if ($this->db) {
            try {
                $stmt = $this->db->prepare("
                    INSERT INTO inquiries (name, email, phone, service_type, water_source, message)
                    VALUES (:name, :email, :phone, :service_type, :water_source, :message)
                ");
                $stmt->execute([
                    ':name' => $data['name'] ?? '',
                    ':email' => $data['email'] ?? '',
                    ':phone' => $data['phone'] ?? '',
                    ':service_type' => $data['service_type'] ?? '',
                    ':water_source' => $data['water_source'] ?? '',
                    ':message' => $data['message'] ?? ''
                ]);
                return $this->db->lastInsertId();
            } catch (Exception $e) {
                error_log("Failed to insert inquiry: " . $e->getMessage());
            }
        }

        // File-based persistence fallback
        $file = dirname(__DIR__) . '/storage/inquiries.json';
        if (!file_exists(dirname($file))) {
            @mkdir(dirname($file), 0777, true);
        }
        $existing = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
        if (!is_array($existing)) $existing = [];

        $data['id'] = time();
        $data['created_at'] = date('Y-m-d H:i:s');
        $existing[] = $data;
        file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT));
        return $data['id'];
    }
}
