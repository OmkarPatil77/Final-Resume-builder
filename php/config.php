<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'root');      // Default username for XAMPP/MAMP
define('DB_PASS', '');          // Default password for XAMPP (empty)
                                // For MAMP, the default is usually 'root'
define('DB_NAME', 'resumebuilder');

// Establish database connection
function get_db_connection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Check if user is logged in
function is_logged_in() {
    return isset($_SESSION['user_id']);
}

// Get current user ID
function get_user_id() {
    return $_SESSION['user_id'] ?? null;
}

// Sanitize input data
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}