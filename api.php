<?php
header("Content-Type: application/json");

// error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0);

$host = 'localhost';
$db = 'api_demo';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=localhost;dname=api_demo", "root", "", [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    $stmt = $pdo->query("SELECT * FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "source" => "PHP",
        "data" => $users
    ]);
} catch (PDOException $e) {
    // log the error internally, show a clean message to user
    http_response_code(500);
    echo json_encode(["error" => "Internal Server Error: Connection Failed"]);
}
?>