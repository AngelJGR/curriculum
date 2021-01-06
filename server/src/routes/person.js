const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

/** RUTAS PARA BÁSICO **/

router.get("/getPerson/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const person = await pool.query("SELECT * FROM person WHERE id = ?", [id]);
	res.json({ person })
});

router.post("/updatePerson/:idUser", isLoggedIn, async (req, res) => {
	const { idUser } = req.params;
	const data = req.body.data;
	try {
		const result = await pool.query("SELECT * FROM person WHERE id_user = ?", [idUser]);
		if (result.length === 0) {
			await pool.query(`INSERT INTO person SET fullname = '${data.fullname}', ci = ${data.ci}, address = '${data.address}', phone = '${data.phone}', twitter = '${data.twitter}', email = '${data.email}', about = '${data.about}', id_user = ${idUser}`);
		} else {
			await pool.query(`UPDATE person SET fullname = '${data.fullname}', ci = ${data.ci}, address = '${data.address}', phone = '${data.phone}', twitter = '${data.twitter}', email = '${data.email}', about = '${data.about}' WHERE id_user = ${idUser}`);
		}
		res.send({success: true});
	} catch(err) {
		res.send({success: false, error: err});
	}
});

module.exports = router;
