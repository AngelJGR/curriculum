const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

/** RUTAS PARA BÁSICO **/

router.get("/getPerson/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	console.log('Llegue. Id:', id)
	const person = await pool.query("SELECT * FROM person WHERE id = ?", [id]);
	res.json({ person })
});

router.post("/basico/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const datos = req.body;
	await pool.query("UPDATE persona SET ? WHERE id = ?", [datos, id]);
	req.flash("success", "Datos Actualizados");
	res.redirect("/update/basico/" + [id]);
});

module.exports = router;
