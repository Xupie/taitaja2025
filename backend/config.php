<?php

require_once __DIR__ . '/load_env.php';
loadEnv(__DIR__ . '../.env');

function getConnection(): PDO {
    try {
        $dsn = "mysql:host=" . $_ENV['DB_HOST'] . ";dbname=" . $_ENV['DB_NAME'] . ";charset=utf8";
        $conn = new PDO($dsn, $_ENV['DB_USER'], $_ENV['DB_PASS']);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $ex) {
        die("database error: " . $ex->getMessage());
    }
}
?>