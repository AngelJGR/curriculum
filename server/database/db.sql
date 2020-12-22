CREATE DATABASE resume;

use resume;

CREATE TABLE users (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(11) NOT NULL UNIQUE,
	password VARCHAR(60) NOT NULL,
	fullname VARCHAR(100) NOT NULL
);

CREATE TABLE person (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	ci INT(11) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	address VARCHAR(255) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	twitter VARCHAR(11),
	email VARCHAR(60) NOT NULL,
	about TEXT NOT NULL
	id_user INT(11) NOT NULL

	CONSTRAINT fk_users FOREIGN KEY (id_user) REFERENCES users(id)
);

CREATE TABLE college(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR (100) NOT NULL,
	address VARCHAR(255) NOT NULL
);

CREATE TABLE college_degree_type(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	description VARCHAR(11) NOT NULL
);

CREATE TABLE college_degree(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	description VARCHAR(255) NOT NULL,
	id_college_degree_type INT(11),

	CONSTRAINT fk_college_degree_type FOREIGN KEY (id_college_degree_type) REFERENCES college_degree_type(id)
);

CREATE TABLE skills(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	description VARCHAR(50) NOT NULL
);

CREATE TABLE person_skills (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_person INT(11),
	id_skill INT(11),
	score TINYINT NOT NULL,

	CONSTRAINT fk_person FOREIGN KEY (id_person) REFERENCES person(id),
	CONSTRAINT fk_skill FOREIGN KEY (id_skill) REFERENCES skills(id)
);

CREATE TABLE college_degree_person (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	id_person INT(11),
	id_college_degree INT(11),
	id_college INT(11),

	CONSTRAINT fk_person_2 FOREIGN KEY (id_person) REFERENCES person(id),
	CONSTRAINT fk_college_degree FOREIGN KEY (id_college_degree) REFERENCES college_degree(id),
	CONSTRAINT fk_college FOREIGN KEY (id_college) REFERENCES college(id)
);

CREATE TABLE organization (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE work_experience (
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	area VARCHAR(200) NOT NULL,
	description TEXT NOT NULL,
	id_person INT(11) NOT NULL,
	id_organization INT(11) NOT NULL,

	CONSTRAINT fk_person_3 FOREIGN KEY (id_person) REFERENCES person(id),
	CONSTRAINT fk_organization FOREIGN KEY (id_organization) REFERENCES organization(id)
);
