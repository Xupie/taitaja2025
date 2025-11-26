<?php
header('Content-Type: application/json');
$method = $_SERVER["REQUEST_METHOD"];

session_start();

// Create game session between game and user
if ($method == 'GET') {
    if ($_GET['id']) {
        $id = $_GET['id'];
        $_SESSION[$id] = uniqid();
        http_response_code(200);
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(400);
        echo json_encode(["status" => "missing id"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "no method"]);
}
