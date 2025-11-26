<?php

header('Content-Type: application/json');

include "db.php";
$conn = getConnection();

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (isset($_POST['login'])) {
    $opettajanimi = $conn->real_escape_string($_POST['name']);
    $salasana = $_POST['salasana'];

    $res = $conn->query("SELECT * FROM opettajat WHERE nimi='$opettajanimi'");

    if ($res->num_rows == 1) {
        $opettaja = $res->fetch_assoc();

        if (password_verify($salasana, $opettaja['salasana'])) {
            $_SESSION['opettaja'] = $opettaja;
            http_response_code(200);
            echo json_encode(["status" => "successfully logged in"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Väärä salasana!"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Kayttäjää ei löytynyt"]);
    }
}
