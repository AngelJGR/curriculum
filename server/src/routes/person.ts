import { Router } from 'express'
import { Request } from 'express'
import { Response } from 'express'
/* const express = require("express");
const router = express.Router(); */

import { pool } from '../database'

// const pool = require("../database");

import isLoggedIn from'../lib/auth'

/** RUTAS PARA BÁSICO **/
export default () => {

	Router().get("/getPerson/:id", async (req: Request, res: Response) => {
		const { id } = req.params;
		const person = await pool.query("SELECT * FROM person WHERE id = ?", [id]);
		res.json({ person })
	})
	
	Router().post("/updatePerson/:idUser", async (req: Request, res: Response) => {
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
	})
}

// module.exports = Router;
