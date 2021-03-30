import { Request, Response } from 'express'

import { pool } from '../database'

class PersonController {

  async getPerson(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		try {
			const person = await pool.query("SELECT * FROM person WHERE id = ?", [user.id]);
			res.send({ success: true, person })
		} catch (error) {
			await res.send({ success: false, error })
    }
  }
  
  async updatePerson(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const data = req.body.data;
		try {
			const result = await pool.query("SELECT * FROM person WHERE id_user = ?", [user.id]);
			if (result.length === 0) {
				await pool.query(`INSERT INTO person SET fullname = '${data.fullname}', ci = ${data.ci}, address = '${data.address}', phone = '${data.phone}', twitter = '${data.twitter}', email = '${data.email}', about = '${data.about}', id_user = ${user.id}`);
			} else {
				await pool.query(`UPDATE person SET fullname = '${data.fullname}', ci = ${data.ci}, address = '${data.address}', phone = '${data.phone}', twitter = '${data.twitter}', email = '${data.email}', about = '${data.about}' WHERE id_user = ${user.id}`);
			}
			res.send({success: true});
		} catch(err) {
			res.send({success: false, error: err});
		}
	}
}

export default new PersonController()