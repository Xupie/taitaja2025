<?php
include "db.php";

header('Content-Type: application/json');

$conn = getConnection();

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === 'POST') {
    
    // Create game session between game and user
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['id']) || !isset($data['username'])) {
        http_response_code(400);
        echo json_encode(["status" => "missing id or username"]);
        exit;
    }

    // category_id
    $gameId = $data['id'];

    $username = trim($data['username']);
    if ($username === "") {
        http_response_code(400);
        echo json_encode(["status" => "empty username"]);
        exit;
    }

    try {
        $stmt = $conn->prepare("INSERT INTO users (username) VALUES (?)");
        $stmt->bind_param("s", $data['username']);
        $stmt->execute();
        $userId = $stmt->insert_id;
    } catch (Exception $ex) {
        http_response_code(400);
        echo json_encode(["status" => $ex->getMessage()]);
        exit;
    }

    if (!isset($_SESSION["games"])) {
        $_SESSION["games"] = [];
    }

    $_SESSION["games"][$gameId] = [
        "question" => 0,
        "user" => $data['username'],
        "user_id" => $userId,
        "token" => uniqid("session_", true),
    ];

    echo json_encode(["status" => "success"]);
    exit;
}
