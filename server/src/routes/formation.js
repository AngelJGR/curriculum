const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

// Obtener
router.get("/getFormation/:id", async (req, res) => {
	const { id } = req.params;
	const college_degree_type = await pool.query("SELECT id as id_type, description FROM college_degree_type");
	const college = await pool.query("SELECT id as id_college, name FROM college");
	const college_degree = await pool.query(`SELECT * FROM college_degree`);
	const college_degree_person = await pool.query("SELECT * FROM college_degree_person WHERE id_person = ?", [id]);
	res.json({ id, college_degree_person, college_degree_type, college_degree, college });
});

router.post("/getCollegeDregrees", async (req, res) => {
	const college_degree = await pool.query(`SELECT * FROM college_degree WHERE description like '%${req.body.text}%'`);
	res.json({ college_degree });
});

router.post("/setCollegeDegree", async (req, res) => {
	const data = {
		id_person: req.body.idPerson,
		id_college_degree: req.body.idCollegeDegree,
		id_college: req.body.idCollege
	}
	try {
		const result = await pool.query("INSERT INTO college_degree_person SET ?", [data])
		res.json({ success: true });
	}
	catch (error) {
		res.json({ success: false, error });
	}
});

/* router.get("/getColleges", async (req, res) => {
	const college = await pool.query("SELECT * FROM college");
	res.json({ college });
}); */

// Guardar
router.post("add/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { curso, id_tipo_titulo, id_casa_de_estudio } = req.body;
	await pool.query("INSERT INTO titulos \
		SET descripcion = ?, id_tipo_titulo = ?", [curso, id_tipo_titulo]);
	const ultimoRegistro = await pool.query("SELECT max(id) AS ultimo FROM titulos;");
	await pool.query("INSERT INTO persona_titulo SET id_persona = ?, id_titulo = ?, id_casa_de_estudio = ?",
		[id, ultimoRegistro[0].ultimo, id_casa_de_estudio]);
	req.flash("success", "Registro exitoso");
	res.redirect("/update/formacion/" + [id]);
});

// Eliminar
router.get("/formacion/:id", isLoggedIn, async (req, res) => {
	const id_pt = req.params.id;
	const id = await pool.query("SELECT id_person FROM college_degree_person WHERE id = ?", [id_pt] );
	await pool.query("DELETE a, b college_degree_person AS a \
	INNER JOIN titulos AS b ON a.id_titulo = b.id \
	WHERE a.id = ? ", [id_pt]);
	req.flash("success", "Registro Eliminado");
	res.redirect("/update/formacion/" + id[0].id_persona);
});

/** Actualizar (REVISAR!!!!) **/

router.get("/formacion/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const persona_cursos = await pool.query("SELECT a.id, a.id_persona, c.id_tipo_titulo, b.fullname, c.descripcion AS curso, \
	e.descripcion, d.nombre, a.id_titulo, a.id_casa_de_estudio FROM persona_titulo AS a, persona AS b, titulos AS c, \
	casa_de_estudio AS d, tipo_titulo AS e WHERE a.id_persona = b.id AND a.id_titulo = c.id \
	AND a.id_casa_de_estudio = d.id AND c.id_tipo_titulo = e.id AND b.id = ?", [id]);
	const casa_de_estudio = await pool.query("SELECT * FROM casa_de_estudio");
	const tipo_titulo = await pool.query("SELECT * FROM tipo_titulo");
	res.render("update/formacion", { persona: persona_cursos, id: id, tipo_titulo: tipo_titulo, casa_de_estudio: casa_de_estudio });
});

router.post("/formacion/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const ciclo = req.body.id_persona.length;
	const { id_pc, id_persona, id_tipo_titulo, curso, nombre, id_casa_de_estudio } = req.body;
	console.log(req.body);
	for (var i = 0; i < ciclo; i++) {
		await pool.query("UPDATE persona_titulo AS a \
		INNER JOIN titulos AS b ON b.id = a.id_titulo \
		INNER JOIN casa_de_estudio AS c ON a.id_casa_de_estudio = c.id \
		INNER JOIN persona AS d ON a.id_persona = d.id \
		SET b.id_tipo_titulo = ?, b.descripcion = ?, a.id_casa_de_estudio = ? \
		WHERE d.id = ? AND a.id = ?", [id_tipo_titulo[i], curso[i], id_casa_de_estudio[i], id_persona[i], id_pc[i]]);
	}
	req.flash("success", "Datos Actualizados");
	res.redirect("/update/formacion/" + [id]);
});

module.exports = router;