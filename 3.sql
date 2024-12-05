CREATE DATABASE IF NOT EXISTS cafe_internet;
USE cafe_internet;

-- Tabla de computadoras
CREATE TABLE IF NOT EXISTS computadoras (
    id_computadora INT PRIMARY KEY AUTO_INCREMENT,
    numero_computadora VARCHAR(10) NOT NULL,
    direccion_ip VARCHAR(15) NOT NULL,
    en_uso BOOLEAN DEFAULT FALSE
) ENGINE=INNODB;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(100) NOT NULL,
    tiempo_uso INT NOT NULL, -- en segundos
    costo_total DECIMAL(10, 2) NOT NULL,
    id_computadora INT,
    FOREIGN KEY (id_computadora) REFERENCES computadoras(id_computadora) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=INNODB;

-- Tabla de sesiones
CREATE TABLE IF NOT EXISTS sesiones (
    id_sesion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    tiempo_total INT NOT NULL, -- en segundos
    costo_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB;

-- Datos iniciales para la tabla de computadoras
INSERT INTO computadoras (numero_computadora, direccion_ip, en_uso) 
VALUES 
('PC-1', '192.168.6.1', FALSE),
('PC-2', '192.168.6.2', FALSE),
('PC-3', '192.168.6.3', FALSE),
('PC-4', '192.168.6.4', FALSE);
