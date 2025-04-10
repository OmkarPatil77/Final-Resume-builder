<?php
require_once 'config.php';

try {
    $conn = get_db_connection();
    echo "Database connection successful!";
    $conn->close();
} catch (Exception $e) {
    echo "Database connection failed: " . $e->getMessage();
}