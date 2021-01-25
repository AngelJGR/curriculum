import { Request } from 'express'
import { Response } from 'express'

import { pool } from '../database'

class FormationController {
	async getFormation (req: Request, res: Response): Promise<void> {
		const { id } = req.params;
		const college_degree_type = await pool.query("SELECT id as id_type, description FROM college_degree_type");
		const college = await pool.query("SELECT id as id_college, name FROM college");
		const college_degree = await pool.query(`SELECT * from college_degree
				WHERE id NOT IN(
				SELECT id_college_degree FROM college_degree_person WHERE id_person = ?)`, [id]);
		const college_degree_person = await pool.query("SELECT a.id, a.id_college_degree, b.description AS college_degree, c.name AS college \
				FROM college_degree_person AS a, college_degree AS b, college AS c \
				WHERE a.id_college_degree = b.id \
				AND a.id_college = c.id \
				AND a.id_person = ?;", [id]);
		res.json({ id, college_degree_person, college_degree_type, college_degree, college });
	}

	async setCollegeDegree (req: Request, res: Response): Promise<void> {
		const data = {
			id_person: req.body.idPerson,
			id_college_degree: req.body.idCollegeDegree,
			id_college: req.body.idCollege
		}
		try {
			const result = await pool.query("INSERT INTO college_degree_person SET ?", [data])
			const college_degree_person = await pool.query("SELECT a.id, a.id_college_degree, b.description AS college_degree, c.name AS college \
				FROM college_degree_person AS a, college_degree AS b, college AS c \
				WHERE a.id_college_degree = b.id \
				AND a.id_college = c.id \
				AND a.id = ?;", [result.insertId]);
			res.json({ success: true, college_degree_person });
		}
		catch (error) {
			res.json({ success: false, error });
		}
	}

	async unsetCollegeDegree (req: Request, res: Response): Promise<void> {
		try {
			const result = await pool.query('DELETE FROM college_degree_person WHERE id = ?', [req.params.id])
			res.json({ success: true, result });
		} catch (error) {
			res.json({ success: false, error });
		}
	}
}

export default new FormationController()