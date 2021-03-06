import { Request, Response } from 'express'

import { pool } from '../database'

class ExperienceController {

  async getSkillsPerson(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const skillsPerson = await pool.query("SELECT a.id, a.id_skill, b.description, a.score \
				FROM person_skills AS a, skills AS b \
				WHERE a.id_skill = b.id \
				AND a.id_person = ?;", [user.id_person]);
		res.json({ success: true, skillsPerson });
  }
  
  async getSkills(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const skills = await pool.query(`SELECT * FROM skills WHERE description like '%${req.body.text}%' AND id NOT IN (
				SELECT id_skill FROM person_skills WHERE id_person = ${user.id_person})`);
		res.json({ skills });
	}

	async setSkill(req: Request, res: Response): Promise<void> {
		const user: any = req.user;
		const { idSkill, score } = req.body
		const data: any = {
			id_person: user.id_person,
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

	async unsetSkill(req: Request, res: Response): Promise<void> {
		try {
			const result = await pool.query('DELETE FROM person_skills WHERE id = ?', [req.params.id])
			res.json({ success: true, result });
		} catch (error) {
			res.json({ success: false, error });
		}
	}
}

export default new ExperienceController()