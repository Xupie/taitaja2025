<?php
include "db.php";

header('Content-Type: application/json');

$conn = getConnection();
$method = $_SERVER["REQUEST_METHOD"];

session_start();

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $answer = $data["answer"];

}

if ($method == 'GET') {

    // Return options of category by id
    if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $stmt = $conn->prepare("
            SELECT
                question,
                option_a,
                option_b,
                option_c,
                option_d
            FROM questions
            WHERE category_id=?
        ");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $options = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($options);

    // Return every category
    } else {
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
}
