<?php
include "db.php";

header('Content-Type: application/json');

$conn = getConnection();
$method = $_SERVER["REQUEST_METHOD"];

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $answer = $data["answer"];
    $gameId = $data["gameId"];

    if (!isset($_SESSION["games"][$gameId])) {
        http_response_code(400);
        echo json_encode(["status" => "no game session"]);
        exit;
    }

    $game = $_SESSION["games"][$gameId];
    $userId = $game["user_id"];
    $questionIndex = $game["question"];

    // Get category data
    $stmt = $conn->prepare("
        SELECT 
            id, 
            correct_option
        FROM questions
        WHERE category_id = ?
        LIMIT ?, 1
    ");
    $stmt->bind_param("si", $gameId, $questionIndex);
    $stmt->execute();
    $result = $stmt->get_result()->fetch_assoc();

    if (!$result) {
        echo json_encode(["status" => "finished"]);
        exit;
    }

    $questionId = $result["id"];
    $correct = $result["correct_option"];
    $isCorrect = ($answer === $correct) ? 1 : 0;

    // add answer to user_answers
    $stmt = $conn->prepare("
        INSERT INTO user_answers (user_id, question_id, answer, is_correct)
        VALUES (?, ?, ?, ?)
    ");
    $stmt->bind_param("iisi", $userId, $questionId, $answer, $isCorrect);
    $stmt->execute();

    // move to next question
    $_SESSION["games"][$gameId]["question"]++;

    echo json_encode([
        "status" => $isCorrect ? "Correct" : "Incorrect"
    ]);
    exit;
}

if ($method == 'GET') {

    // Return options of category by id
    if (isset($_GET["id"])) {
        $id = $_GET["id"];

        $currentIndex = 0;
        // Check session for last question
        if (isset($_SESSION["games"][$id])) {
            $currentIndex = $_SESSION["games"][$id]['question'];
        }

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

        echo json_encode([
            "questions" => $options,
            "questionIndex" => $currentIndex,
        ]);
        exit;

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
        exit;
    }
}
