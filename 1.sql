CREATE DATABASE	IF NOT EXISTS BaseVerdu;

USE BaseVerdu;

CREATE TABLE IF NOT EXISTS Categorias(
	id_categorias INT NOT NULL,
	nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY (id_categorias)

)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS Productos(
	id_Producto INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    origen VARCHAR(100),
    familia VARCHAR(100),
    costo_unidad DECIMAL(10, 2) NOT NULL,
    precio_kilo DECIMAL(10, 2) NOT NULL,
    descripcion VARCHAR(255),
    imagen VARCHAR(255),
    id_categoria INT,
    PRIMARY KEY(id_Producto)
)ENGINE=INNODB;


CREATE TABLE IF NOT EXISTS Ventas(
	id_Venta INT NOT NULL,
    fecha_Venta DATETIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY(id_Venta)
)ENGINE=INNODB;