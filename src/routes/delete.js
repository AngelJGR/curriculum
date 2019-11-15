const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

router.get("/formacion/:id", isLoggedIn, async (req, res) => {
	const id_pt = req.params.id;
	const id = await pool.query("SELECT id_persona FROM persona_titulo WHERE id = ?", [id_pt] );
	await pool.query("DELETE a, b FROM persona_titulo AS a \
	INNER JOIN titulos AS b ON a.id_titulo = b.id \
	WHERE a.id = ? ", [id_pt]);
	req.flash("success", "Registro Eliminado");
	res.redirect("/update/formacion/" + id[0].id_persona);
});

router.get("/experiencia/:id", isLoggedIn, async (req, res) => {
	const id_exp = req.params.id;
	const id = await pool.query("SELECT id_persona FROM experiencia_laboral WHERE id = ?", [id_exp] );
	await pool.query("DELETE FROM experiencia_laboral WHERE id = ? ", [id_exp]);
	req.flash("success", "Registro Eliminado");
	res.redirect("/update/experiencia/" + id[0].id_persona);
});

router.get("/habilidades/:id", isLoggedIn, async (req, res) => {
	const id_hab = req.params.id;
	const id = await pool.query("SELECT id_persona FROM habilidades_personas WHERE id = ?", [id_hab] );
	await pool.query("DELETE a, b FROM habilidades_personas AS a \
	INNER JOIN habilidades AS b ON a.id_habilidad = b.id \
	WHERE a.id = ? ", [id_hab]);
	req.flash("success", "Registro Eliminado");
	res.redirect("/update/habilidades/" + id[0].id_persona);
});


module.exports = router;