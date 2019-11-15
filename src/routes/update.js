const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

/** RUTAS PARA BÁSICO **/

router.get("/basico/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const persona = await pool.query("SELECT * FROM persona WHERE id = ?", [id]);
	res.render("update/basico", { persona: persona[0], id });
});

router.post("/basico/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const datos = req.body;
	await pool.query("UPDATE persona SET ? WHERE id = ?", [datos, id]);
	req.flash("success", "Datos Actualizados");
	res.redirect("/update/basico/" + [id]);
});


/** RUTAS PARA FORMACIÓN **/

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


/** RUTAS PARA EXPERIENCIA **/

router.get("/experiencia/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const persona = await pool.query("SELECT a.id, a.titulo, a.descripcion, a.id_persona, a.id_instituto, c.nombre \
	FROM experiencia_laboral AS a \
	INNER JOIN persona AS b ON a.id_persona = b.id \
	INNER JOIN instituto AS c ON a.id_instituto = c.id \
	WHERE b.id = ?", [id]);
	const instituto = await pool.query("SELECT * FROM instituto");
	res.render("update/experiencia", { persona, id, instituto });
});

router.post("/experiencia/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { id_exp, id_persona, id_instituto, titulo, descripcion } = req.body;
	const cont = req.body.id_persona.length;
	for (var i = 0; i < cont; i++) {
		await pool.query("UPDATE experiencia_laboral AS a \
		INNER JOIN persona AS b ON a.id_persona = b.id \
		INNER JOIN instituto AS c ON a.id_instituto = c.id \
		set a.titulo = ?, a.descripcion = ?, a.id_instituto = ? \
		WHERE b.id = ? AND a.id = ?", [titulo[i], descripcion[i], id_instituto[i], id_persona[i], id_exp[i]]);	
	}
	req.flash("success", "Datos Actualizados");
	res.redirect("/update/experiencia/" + [id]);
});


/** RUTAS PARA HABILIDADES **/

router.get("/habilidades/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const persona = await pool.query("SELECT a.id, b.id AS id_persona, c.id AS id_habilidades, c.descripcion, a.calificacion \
		FROM habilidades_personas AS a \
		INNER JOIN persona AS b ON a.id_persona = b.id \
		INNER JOIN habilidades AS c ON a.id_habilidad = c.id \
		WHERE b.id = ?", [id]);
	res.render("update/habilidades", { persona, id });
});

router.post("/habilidades/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const cont = req.body.id_hp.length;
	const { id_hp, calificacion } = req.body;
	for (var i = 0; i < cont; i++) {
		await pool.query("UPDATE habilidades_personas AS a \
			INNER JOIN persona AS b ON a.id_persona = b.id \
			INNER JOIN habilidades AS c ON a.id_habilidad = c.id \
			SET a.calificacion = ? \
			WHERE a.id = ?", [calificacion[i], id_hp[i]]);
	}
	req.flash("success", "Datos Actualizados");
	res.redirect("/update/habilidades/" + [id]);
});

module.exports = router;
