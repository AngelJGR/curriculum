CREATE DATABASE cv;

use cv;

CREATE TABLE usuarios (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	usuario VARCHAR(11) NOT NULL,
	password VARCHAR(60) NOT NULL,
	nombre_completo VARCHAR(100) NOT NULL
);

CREATE TABLE persona (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ci INT(11) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	direccion VARCHAR(255) NOT NULL,
	telefono VARCHAR(20) NOT NULL,
	twitter VARCHAR(11),
	correo VARCHAR(60) NOT NULL,
	about TEXT NOT NULL
);

CREATE TABLE casa_de_estudio(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR (100) NOT NULL,
	direccion VARCHAR(255) NOT NULL
);

CREATE TABLE tipo_titulo(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(11) NOT NULL
);

CREATE TABLE titulos(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(255) NOT NULL,
	id_tipo_titulo INT(11),

	CONSTRAINT fk_tipo_titulo FOREIGN KEY (id_tipo_titulo) REFERENCES tipo_titulo(id)
);

CREATE TABLE habilidades(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE habilidades_personas (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_persona INT(11),
	id_habilidad INT(11),
	calificacion TINYINT NOT NULL,

	CONSTRAINT fk_persona FOREIGN KEY (id_persona) REFERENCES persona(id),
	CONSTRAINT fk_habilidad FOREIGN KEY (id_habilidad) REFERENCES habilidades(id)
);

CREATE TABLE persona_titulo (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_persona INT(11),
	id_titulo INT(11),
	id_casa_de_estudio INT(11),

	CONSTRAINT fk_persona_2 FOREIGN KEY (id_persona) REFERENCES persona(id),
	CONSTRAINT fk_titulo FOREIGN KEY (id_titulo) REFERENCES titulos(id),
	CONSTRAINT fk_casa_de_estudio FOREIGN KEY (id_casa_de_estudio) REFERENCES casa_de_estudio(id)
);

CREATE TABLE instituto (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL
);

CREATE TABLE experiencia_laboral (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(200) NOT NULL,
	descripcion TEXT NOT NULL,
	id_persona INT(11) NOT NULL,
	id_instituto INT(11) NOT NULL,

	CONSTRAINT fk_persona_3 FOREIGN KEY (id_persona) REFERENCES persona(id),
	CONSTRAINT fk_instituto FOREIGN KEY (id_instituto) REFERENCES instituto(id)
);
