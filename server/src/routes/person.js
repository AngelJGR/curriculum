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

module.exports = router;
