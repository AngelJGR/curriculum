import { Router } from 'express'

import ResumeController from '../controllers/resumeController'

/** RUTAS PARA BÁSICO **/
export default () => {
	const ResumeRouter = Router()

	ResumeRouter.get("/:username", ResumeController.getUser)
	ResumeRouter.get("/", ResumeController.getMain)

	return ResumeRouter
}

/* const express = require("express");
const router = express.Router();

const pool = require("../database"); */

/* router.get("/:username", async (req, res) => {
	
}); */

/* router.get("/", (req, res) => {
	res.json({hola: "Hola mundo"})
})

module.exports = router; */