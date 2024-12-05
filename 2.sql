CREATE DATABASE IF NOT EXISTS ferreteria;
USE ferreteria;

-- Tabla de categorias de ferreteria
CREATE TABLE IF NOT EXISTS categorias_ferreteria (
    id_categoria_ferreteria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
) ENGINE=INNODB;

-- Tabla de productos de ferreteria
CREATE TABLE IF NOT EXISTS productos_ferreteria (
    id_producto_ferreteria INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    origen VARCHAR(100),
    familia VARCHAR(100),
    costo_unidad DECIMAL(10, 2) NOT NULL,
    descripcion VARCHAR(255),
    imagen VARCHAR(255),
    id_categoria_ferreteria INT,
    FOREIGN KEY (id_categoria_ferreteria) REFERENCES categorias_ferreteria(id_categoria_ferreteria) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=INNODB;

-- Datos iniciales para la tabla de categorias de ferreteria
INSERT INTO categorias_ferreteria (nombre) VALUES ('Herramientas de Mano'), ('Herramientas Eléctricas'), ('Materiales'), ('Accesorios');

-- Datos iniciales para la tabla de productos de ferreteria (ejemplos)
INSERT INTO productos_ferreteria (nombre, origen, familia, costo_unidad, descripcion, imagen, id_categoria_ferreteria) 
VALUES 
('Martillo', 'China', 'Herramientas de Mano', 5.0, 'Martillo de acero', '/img/martillo.png', 1),
('Tornillos', 'España', 'Materiales', 4.0, 'Paquete de tornillos', '/img/tornillo.png', 3),
('Taladro', 'EEUU', 'Herramientas Eléctricas', 50.0, 'Taladro eléctrico', '/img/tal.png', 2),
('Caja de Herramientas', 'China', 'Accesorios', 20.0, 'Caja de herramientas portátil', '/img/caja.png', 4);
