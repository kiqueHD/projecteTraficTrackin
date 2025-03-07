-- este script crea una base de datos simple con una tabla usuarios (id pk, email nn unique, password nn)
CREATE DATABASE IF NOT EXISTS dbTrafficTracking;
USE dbTrafficTracking;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
