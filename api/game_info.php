<?php
include "db.php";

header('Content-Type: application/json');

$conn = getConnection();

if ($_SERVER["REQUEST_METHOD"] === 'GET') {
    if (isset($_GET['id'])) {
        $id = trim(htmlspecialchars($_GET['id']));

        $stmt = $conn->prepare("
            SELECT
                name,
                description
            FROM categories
            WHERE id=?
        ");
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $category = $result->fetch_assoc();

        echo json_encode($category);
        exit;
    }
}
