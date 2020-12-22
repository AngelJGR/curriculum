const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/:username", async (req, res) => {
	//Consulta de los datos personales
	const user = await pool.query("SELECT * FROM users WHERE username = ?", req.params.username);
	if (user.length === 0) {
		res.send(false)
		return
	}
	const person = await pool.query("SELECT * FROM person WHERE id_user = ?", user[0].id);
	console.log(person)
	// const persona = personas[0];
	const { id } = person;
	//Consulta de los titulos A college_degree_person, B person, C college_degree, D college
	const college_degree_person = await pool.query("SELECT b.id, b.fullname, c.description, \
	c.id_college_degree_type, d.name FROM college_degree_person AS a, person AS b, college_degree AS c, \
	college AS d WHERE a.id_person = b.id AND a.id_college_degree = c.id \
	AND a.id_college = d.id AND c.id_college_degree_type = 1 AND b.id = ?", [id]);
	//Consulta de los cursos A college_degree_person, B person, C college_degree, D college
	const courses_person = await pool.query("SELECT b.id, b.fullname, c.description, \
	c.id_college_degree_type, d.name FROM college_degree_person AS a, person AS b, college_degree AS c, \
	college AS d WHERE a.id_person = b.id AND a.id_college_degree = c.id \
	AND a.id_college = d.id AND id_college_degree_type = 2 AND b.id = ?", [id]);
	//Consulta de las habilidades A skills, B person_skills C person
	const skills = await pool.query("SELECT a.description, b.score \
	FROM skills AS a, person_skills AS b, person AS c \
	WHERE a.id = b.id_skill AND c.id = b.id_person AND c.id = ?", [id]);
	//Experiencia Laboral A work_experience, B person, C organization
	const experience = await pool.query("SELECT a.area, a.description, c.name \
	FROM work_experience AS a, person AS b, organization AS c \
	WHERE a.id_person = b.id AND a.id_organization = c.id AND b.id = ?", [id]);

	res.json({ person, college_degree_person, courses_person, skills, experience });
});

router.get("/", (req, res) => {
	res.json({hola: "Hola mundo"})
})

module.exports = router;