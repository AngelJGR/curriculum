const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

/* ADD */
router.get("/getExperience/:idPerson", isLoggedIn, async (req, res) => {
	const { idPerson } = req.params;
	try {
		const experience = await pool.query('SELECT a.id, a.area, a.description, b.name \
		FROM work_experience AS a, organization AS b \
		WHERE a.id_organization = b.id AND a.id_person = ?', [idPerson])
		res.json({ success: true, experience });
	} catch (error) {
		res.json({ success: false, error });
	}
});

router.post("/getOrganizations", async (req, res) => {
	const organizations = await pool.query(`SELECT * FROM organization WHERE name like '%${req.body.text}%' AND id NOT IN (
			SELECT id_organization FROM work_experience WHERE id_person = ${req.body.idPerson})`);
	res.json({ organizations });
});

router.post("/setExperience", isLoggedIn, async (req, res) => {
	const { idPerson, area, description, idOrganization } = req.body
	const data = {
		id_person: idPerson,
		area,
		description,
		id_organization: idOrganization
	}
	try {
		const result = await pool.query ("INSERT INTO work_experience SET ?", [data])
		const experience = await pool.query("SELECT a.id, a.area, a.description, b.name \
				FROM work_experience AS a, organization AS b \
				WHERE a.id_organization = b.id \
				AND a.id = ?;", [result.insertId]);
		res.json({ success: true, experience});
	} catch (error) {
		res.json({ success: false, error});
	}
});




router.post("/experiencia/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const experiencia = req.body;
	await pool.query("INSERT INTO experiencia_laboral SET ?", [experiencia]);
	req.flash("success", "Registro exitoso");
	res.redirect("/update/experiencia/" + [id]);
});


/** UPDATE **/

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



/* DELETE */
router.get("/experiencia/:id", isLoggedIn, async (req, res) => {
	const id_exp = req.params.id;
	const id = await pool.query("SELECT id_persona FROM experiencia_laboral WHERE id = ?", [id_exp] );
	await pool.query("DELETE FROM experiencia_laboral WHERE id = ? ", [id_exp]);
	req.flash("success", "Registro Eliminado");
	res.redirect("/update/experiencia/" + id[0].id_persona);
});



module.exports = router;