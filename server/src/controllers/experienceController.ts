import { Request, Response } from 'express'

import { pool } from '../database'

class ExperienceController {

  async getExperiences(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		try {
			const experiences = await pool.query('SELECT a.id, a.area, a.description, b.name \
			FROM work_experience AS a, organization AS b \
			WHERE a.id_organization = b.id AND a.id_person = ?', [user.id_person])
			res.json({ success: true, experiences });
		} catch (error) {
			res.json({ success: false, error });
		}
  }
  
  async getOrganizations(req: Request, res: Response): Promise<void> {
		const organizations = await pool.query(`SELECT * FROM organization WHERE name like '%${req.body.text}%'`);
		res.json({ organizations });
	}

	async setExperience(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const { area, description, idOrganization } = req.body
		const data = {
			id_person: user.id_person,
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
	}

	async unsetExperience(req: Request, res: Response): Promise<void> {
		try {
			const result = await pool.query('DELETE FROM work_experience WHERE id = ?', [req.params.id])
			res.json({ success: true, result });
		} catch (error) {
			res.json({ success: false, error });
		}
	}
}

export default new ExperienceController()