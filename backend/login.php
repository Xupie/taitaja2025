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

<!DOCTYPE html>
<html lang="fi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kirjaudu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Kirjaudu</h1>

    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>

    
    <form method="post">
        Käyttäjätunnus: <input type="text" name="name" required><br><br>
        Salasana: <input type="password" name="salasana" required><br><br>
        <button type="submit" name="login">Kirjaudu</button>
    </form>
</body>
</html>


