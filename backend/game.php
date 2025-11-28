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

// user send answer
if ($method == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $answer = $data["answer"];
    $gameId = $data["gameId"];

    if (!isset($_SESSION["games"][$gameId])) {
        http_response_code(401);
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

    $correct = $result["correct_option"];
    $isCorrect = ($answer === $correct) ? 1 : 0;

    // Add correct options to session to show it at the end
    if (!isset($_SESSION["games"][$gameId]["correct_count"])) {
        $_SESSION["games"][$gameId]["correct_count"] = 0;
    }
    if ($isCorrect) {
        $_SESSION["games"][$gameId]["correct_count"]++;

        // add answer to user_answers if it's correct
        $stmt = $conn->prepare("
            INSERT INTO user_answers (user_id, category_id)
            VALUES (?, ?)
        ");
        $stmt->bind_param("ii", $userId, $gameId);
        $stmt->execute();
    }

    // move to next question
    $_SESSION["games"][$gameId]["question"]++;

    echo json_encode([
        "status" => $isCorrect ? "Correct" : "Incorrect",
        "correct_count" => $_SESSION["games"][$gameId]["correct_count"],
    ]);
    exit;
}

if ($method == 'GET') {

    // Return options of category by id
    if (isset($_GET["id"])) {
        $gameId = $_GET["id"];

        $currentIndex = 0;
        // Check session for last question
        if (isset($_SESSION["games"][$gameId])) {
            $currentIndex = $_SESSION["games"][$gameId]['question'];
        }

        $correct_count = 0;
        // check session for correctly answered count
        if (isset($_SESSION["games"][$gameId]["correct_count"])) {
            $correct_count = $_SESSION["games"][$gameId]["correct_count"];
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
        $stmt->bind_param("s", $gameId);
        $stmt->execute();
        $result = $stmt->get_result();
        $options = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode([
            "questions" => $options,
            "questionIndex" => $currentIndex,
            "correct_count" => $correct_count,
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
