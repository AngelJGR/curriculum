import { NextFunction, Request, Response } from 'express'

import passport from 'passport'
import jwt from 'jsonwebtoken'

import { pool } from '../database'
import User from '../models/user';

class AuthController {

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		passport.authenticate("local.login", async (error, user: User | undefined, info): Promise<any> => {
			try {
				if (error) {
					return next(error)
				} else if (!user) {
					return res.json({...info})
				}
				req.login(user, {session: false}, async (err) => {
					if (err) return next(err)
					const body = { 
						id: user.id,
						id_person: user.id_person,
						username: user.username,
						fullname: user.fullname
					}
					const token = jwt.sign({ user: body }, 'top_secret', { expiresIn: 86400 })
					return res.json({ token, body, ...info })
				})
			} catch(e) {
				return next(e)
			}
		})(req, res, next);	
  }
  
  async logout(req: Request, res: Response): Promise<void> {
		req.logout();
		res.send({success: true});
	}

	async validateUser(req: Request, res: Response): Promise<void> {
		const { username } = req.params;
		const result = await pool.query("SELECT * FROM users WHERE username = ?", [username])
		res.send(result.length > 0 ? true : false)
	}

	async registerUser(req: Request, res: Response): Promise<void> {
		res.json({
			message: "Usuario registrado exitósamente",
			user: req.user
		})
	}
}

export default new AuthController()