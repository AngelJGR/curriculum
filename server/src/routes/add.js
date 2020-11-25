const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

router.get("/formacion/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const tipo_titulo = await pool.query("SELECT id as id_tipo, descripcion FROM tipo_titulo");
	const casa_de_estudio = await pool.query("SELECT id as id_casa_de_estudio, nombre FROM casa_de_estudio");
	res.render("add/formacion", { id, tipo_titulo, casa_de_estudio });
});

router.post("/formacion/:id", isLoggedIn, async (req, res) => {
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


router.get("/experiencia/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const instituto = await pool.query("SELECT * FROM instituto");
	res.render("add/experiencia", { id, instituto });
});

router.post("/experiencia/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const experiencia = req.body;
	await pool.query("INSERT INTO experiencia_laboral SET ?", [experiencia]);
	req.flash("success", "Registro exitoso");
	res.redirect("/update/experiencia/" + [id]);
});



router.get("/habilidades/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	res.render("add/habilidades", { id });
});

router.post("/habilidades/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { id_persona, descripcion, calificacion } = req.body;
	await pool.query("INSERT INTO habilidades SET descripcion = ? ", [descripcion]);
	const ultimo = await pool.query("SELECT max(id) AS ultimo FROM habilidades");
	await pool.query("INSERT INTO habilidades_personas SET id_persona = ?, id_habilidad = ?, calificacion = ?", [id_persona, ultimo[0].ultimo, calificacion]);
	req.flash("success", "Registro exitoso");
	res.redirect("/update/habilidades/" + [id]);
});

module.exports = router;
