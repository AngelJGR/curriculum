import { Router } from 'express'

import ExperienceController from '../controllers/experienceController';


export default () => {
	const ExperienceRouter = Router()

	ExperienceRouter.get('/getExperiences/:idPerson', ExperienceController.getExperiences)
	ExperienceRouter.post('/getOrganizations', ExperienceController.getOrganizations)
	ExperienceRouter.post('/setExperience', ExperienceController.setExperience)
	ExperienceRouter.delete('/unsetExperience/:id', ExperienceController.unsetExperience)

	return ExperienceRouter
}


const express = require("express");
const router = express.Router();

const pool = require("../database");

const { isLoggedIn } = require("../lib/auth");

/* ADD */
/* router.get("/getExperiences/:idPerson", isLoggedIn, async (req, res) => {
	
}); */

/* router.post("/getOrganizations", async (req, res) => {
}); */

/* router.post("/setExperience", isLoggedIn, async (req, res) => {
	
}); */

/* router.delete("/unsetExperience/:id", async (req, res) => {
	
}); */


/* 
router.post("/experiencia/:id", isLoggedIn, async (req, res) => {
	const { id } = req.params;
	const experiencia = req.body;
	await pool.query("INSERT INTO experiencia_laboral SET ?", [experiencia]);
	req.flash("success", "Registro exitoso");
	res.redirect("/update/experiencia/" + [id]);
});


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