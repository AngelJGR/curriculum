import { Request } from 'express'
import { Response } from 'express'

import { pool } from '../database'

class ExperienceController {

  async getSkillsPerson(req: Request, res: Response) {
		const { idPerson } = req.params;
		const skillsPerson = await pool.query("SELECT a.id, a.id_skill, b.description, a.score \
				FROM person_skills AS a, skills AS b \
				WHERE a.id_skill = b.id \
				AND a.id_person = ?;", [idPerson]);
		res.json({ success: true, skillsPerson });
  }
  
  async getSkills(req: Request, res: Response) {
		const skills = await pool.query(`SELECT * FROM skills WHERE description like '%${req.body.text}%' AND id NOT IN (
				SELECT id_skill FROM person_skills WHERE id_person = ${req.body.idPerson})`);
		res.json({ skills });
	}

	async setSkill(req: Request, res: Response) {
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
	}

	async unsetSkill(req: Request, res: Response) {
		try {
			const result = await pool.query('DELETE FROM person_skills WHERE id = ?', [req.params.id])
			res.json({ success: true, result });
		} catch (error) {
			res.json({ success: false, error });
		}
	}
}

export default new ExperienceController()