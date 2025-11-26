<?php
include "db.php";

header('Content-Type: application/json');

$conn = getConnection();
$method = $_SERVER["REQUEST_METHOD"];

session_start();

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $answer = "";
}

if ($method == 'GET') {
    $stmt = $conn->prepare("
            SELECT
                categories.id AS id,
                categories.name AS category_name,
                teachers.username AS teacher_username,
                COUNT(questions.id) AS question_count
            FROM categories
            JOIN teachers ON categories.teacher_id = teachers.id
            LEFT JOIN questions ON questions.category_id = categories.id
            GROUP BY categories.id, categories.name, teachers.username;
        ");

    $stmt->execute();
    $result = $stmt->get_result();
    $categories = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($categories);
}