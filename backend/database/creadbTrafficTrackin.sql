
CREATE DATABASE IF NOT EXISTS dbTrafficTracking;
USE dbTrafficTracking;

CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fechaCreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lugares_favoritos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    latitud DECIMAL(9,6),
    longitud DECIMAL(9,6),
    fechaCreado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
