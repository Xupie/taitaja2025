<?php
include "db.php";
header('Content-Type: application/json');

$conn = getConnection();
$method = $_SERVER["REQUEST_METHOD"];

if ($method == 'GET') {
    if (isset($_GET["id"])) {
        $id = $_GET["id"];

        $stmt = $conn->prepare("
            SELECT
                users.username AS username,
                COUNT(user_answers.user_id) AS correct_answers
            FROM user_answers
            JOIN users ON users.id = user_answers.user_id
            WHERE user_answers.category_id = ?
            GROUP BY user_id 
            ORDER BY correct_answers DESC
            LIMIT 10;
        ");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

        echo json_encode($result);
        exit;
    }
}
