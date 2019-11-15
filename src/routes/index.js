const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/", async (req, res) => {
	//Consulta de los datos personales
	const personas = await pool.query("SELECT * FROM persona");
	const persona = personas[0];
	const { id } = persona;
	//Consulta de los titulos
	const persona_titulos = await pool.query("SELECT b.id, b.fullname, c.descripcion, \
	c.id_tipo_titulo, d.nombre FROM persona_titulo AS a, persona AS b, titulos AS c, \
	casa_de_estudio AS d WHERE a.id_persona = b.id AND a.id_titulo = c.id \
	AND a.id_casa_de_estudio = d.id AND id_tipo_titulo = 1 AND b.id = ?", [id]);
	//Consulta de los cursos
	const persona_cursos = await pool.query("SELECT b.id, b.fullname, c.descripcion, \
	c.id_tipo_titulo, d.nombre FROM persona_titulo AS a, persona AS b, titulos AS c, \
	casa_de_estudio AS d WHERE a.id_persona = b.id AND a.id_titulo = c.id \
	AND a.id_casa_de_estudio = d.id AND id_tipo_titulo = 2 AND b.id = ?", [id]);
	//Consulta de las habilidades
	const habilidades = await pool.query("SELECT a.descripcion, b.calificacion \
	FROM habilidades AS a, habilidades_personas AS b, persona AS c \
	WHERE a.id = b.id_habilidad AND c.id = b.id_persona AND c.id = ?", [id]);
	//Experiencia Laboral
	const experiencia = await pool.query("SELECT a.titulo, a.descripcion, c.nombre \
	FROM experiencia_laboral AS a, persona AS b, instituto AS c \
	WHERE a.id_persona = b.id AND a.id_instituto = c.id AND b.id = ?", [id]);

	res.render("./", { persona, persona_titulos, persona_cursos, habilidades, experiencia });
});



module.exports = router;