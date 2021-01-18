const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

router.get("/getSkillsPerson/:idPerson", isLoggedIn, async (req, res) => {
	const { idPerson } = req.params;
	const skillsPerson = await pool.query("SELECT a.id, a.id_skill, b.description, a.score \
			FROM person_skills AS a, skills AS b \
			WHERE a.id_skill = b.id \
			AND a.id_person = ?;", [idPerson]);
	res.json({ success: true, skillsPerson });
});

router.post("/getSkills", async (req, res) => {
	const skills = await pool.query(`SELECT * FROM skills WHERE description like '%${req.body.text}%' AND id NOT IN (
			SELECT id_skill FROM person_skills WHERE id_person = ${req.body.idPerson})`);
	res.json({ skills });
});

router.post("/setSkill", isLoggedIn, async (req, res) => {
	const { idPerson, idSkill, score } = req.body
	const data = {
		id_person: idPerson,
		id_skill: idSkill,
		score
	}
	try {
		const result = await pool.query ("INSERT INTO person_skills SET ?", [data])
		const skill = await pool.query("SELECT a.id, a.id_skill, b.description, a.score \
				FROM person_skills AS a, skills AS b \
				WHERE a.id_skill = b.id \
				AND a.id = ?;", [result.insertId]);
		res.json({ success: true, skill});
	} catch (error) {
		res.json({ success: false, error});
	}
});

router.delete("/unsetSkill/:id", async (req, res) => {
	try {
		const result = await pool.query('DELETE FROM person_skills WHERE id = ?', [req.params.id])
		res.json({ success: true, result });
	} catch (error) {
		res.json({ success: false, error });
	}
});




router.post("/add", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const { id_persona, descripcion, calificacion } = req.body;
	await pool.query("INSERT INTO habilidades SET descripcion = ? ", [descripcion]);
	const ultimo = await pool.query("SELECT max(id) AS ultimo FROM habilidades");
	await pool.query("INSERT INTO habilidades_personas SET id_persona = ?, id_habilidad = ?, calificacion = ?", [id_persona, ultimo[0].ultimo, calificacion]);
	req.flash("success", "Registro exitoso");
	res.redirect("/update/habilidades/" + [id]);
});

/* UPDATE */
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


/* DELETE */
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