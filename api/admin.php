<?php
include "db.php";
header('Content-Type: application/json');
session_start();

$conn = getConnection();

// =================================================
// HELPERS
// =================================================
function response($data)
{
    echo json_encode($data);
    exit;
}

function error($msg)
{
    response(["status" => "error", "message" => $msg]);
}

if (!$conn) {
    error("Database connection error");
}

/**
 * if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
 *  error("Invalid request method");
 * }
 * 
 * if (!isset($_POST['action'])) {
 *  error("No action specified");
 * }
 */

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$action = $_POST['action'] ?? $_GET['action'] ?? null;


// =================================================
// login tarkistus
// =================================================

if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    http_response_code(401);
    error("käyttäjä ei ole kirjautunut sisään");
    exit;
}

// =================================================
//   add question
// =================================================
if ($action === 'add_question') {
    $data = json_decode(file_get_contents("php://input"), true);
    $question = trim($data['question']);
    $a = trim($data['a']);
    $b = trim($data['b']);
    $c = trim($data['c']);
    $d = trim($data['d']);
    $correct = trim($data['correct']);
    $category = trim($data['category']);

    if ($question === "" || $a === "" || $b === "" || $c === "" || $d === "") {
        http_response_code(400);
        error("Fill all fields");
    }

    if (!in_array($correct, ['a', 'b', 'c', 'd'])) {
        http_response_code(400);
        error("Invalid correct answer");
    }

    if (!ctype_digit($category)) {
        http_response_code(400);
        error("Invalid category");
    }

    $stmt = $conn->prepare("
        INSERT INTO questions (question, teacher_id, option_a, option_b, option_c, option_d, correct_option, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");

    if (!$stmt->execute([$question, $_SESSION['teacher_id'], $a, $b, $c, $d, $correct, $category])) {
        http_response_code(400);
        error("DB Error");
    }

    response(["status" => "ok"]);
}

// =================================================
//   delete question
// =================================================
if ($action === 'delete_question') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = trim($data['question_id']);

    if (!ctype_digit($id)) {
        http_response_code(400);
        error("Invalid ID");
    }

    $stmt = $conn->prepare("DELETE FROM questions WHERE id = ?");
    $stmt->execute([$id]);

    response(["status" => "ok"]);
}



// =================================================
//   update question
// =================================================
if ($action === 'update_question') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = trim($data['id']);
    $question = trim($data['question']);
    $a = trim($data['a']);
    $b = trim($data['b']);
    $c = trim($data['c']);
    $d = trim($data['d']);
    $correct = trim($data['correct']);

    if (!ctype_digit($id)) {
        http_response_code(400);
        error("Invalid ID");
    }

    if ($question === "" || $a === "" || $b === "" || $c === "" || $d === "") {
        http_response_code(400);
        error("Fill all fields");
    }

    if (!in_array($correct, ['a', 'b', 'c', 'd'])) {
        http_response_code(400);
        error("Invalid correct answer");
    }

    $stmt = $conn->prepare("
        UPDATE questions
        SET question = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?, correct_option = ?
        WHERE id = ?
    ");

    if (!$stmt->execute([$question, $a, $b, $c, $d, $correct, $id])) {
        http_response_code(400);
        error("DB Error");
    }

    response(["status" => "ok"]);
}



// =================================================
//   add category
// =================================================
if ($action === 'add_category') {
    $data = json_decode(file_get_contents("php://input"), true);
    $category = trim($data['category']);
    $description = trim($data['description']);

    if ($category === "") {
        http_response_code(400);
        error("Category name is empty");
    }

    $stmt = $conn->prepare("INSERT INTO categories (name, description, teacher_id) VALUES (?, ?, ?)");

    if (!$stmt->execute([$category, $description, $_SESSION['teacher_id']])) {
        http_response_code(400);
        error("DB Error");
    }

    response(["status" => "ok"]);
}

// =================================================
//   show results
// =================================================

if ($action === 'show_results') {

    if (!isset($_GET["id"]) || !ctype_digit($_GET["id"])) {
        http_response_code(400);
        error("Invalid category ID");
    }

    $id = (int)$_GET["id"];

    /** @var PDOStatement $stmt */
    $stmt = $conn->prepare("
        SELECT
            users.username AS username,
            SUM(CASE WHEN user_answers.is_correct = 1 THEN 1 ELSE 0 END) AS correct_answers
        FROM user_answers
        JOIN users ON users.id = user_answers.user_id
        WHERE user_answers.category_id = ?
        GROUP BY user_answers.user_id
        ORDER BY correct_answers DESC
        LIMIT 12
    ");

    if (!$stmt) {
        http_response_code(400);
        error("Prepare failed");
    }

    if (!$stmt->execute([$id])) {
        http_response_code(400);
        error("DB Error");
    }

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    response([
        "status" => "ok",
        "results" => $results
    ]);
}

// =================================================
//   edit category
// =================================================
if ($action === 'update_category') {
    $data = json_decode(file_get_contents("php://input"), true);
    $category_id = trim($data['category_id']);
    $category_name = trim($data['category_name']);
    $category_description = trim($data['category_description']);

    if ($category_id === "" || $category_name === "") {
        http_response_code(400);
        error("Fill all fields");
    }

    $stmt = $conn->prepare("
        UPDATE categories
        SET name = ?, description = ?
        WHERE id = ?
    ");

    if (!$stmt->execute([$category_name, $category_description, $category_id])) {
        http_response_code(400);
        error("DB Error");
    }

    response(["status" => "ok"]);
}

// =================================================
//   delete category
// =================================================
if ($action === 'delete_category') {

    $data = json_decode(file_get_contents("php://input"), true);
    $category_id = trim($data['category_id']);

    if ($category_id === "") {
        http_response_code(400);
        error("Category id is empty");
    }

    $stmt = $conn->prepare("DELETE FROM categories WHERE id = ?");

    if (!$stmt->execute([$category_id])) {
        http_response_code(400);
        error("DB Error");
    }

    response(["status" => "ok"]);
}



response(["status" => "error", "message" => "Unknown action"]);
