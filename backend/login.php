<?php

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
            header("Location: index.php");
            exit;
        } else {
            $error = "Väärä salasana!";
        }
    } else {
        $error = "Kayttäjää ei löytynyt";
    }
}
?>


