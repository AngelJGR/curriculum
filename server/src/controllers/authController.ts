import { NextFunction, Request, Response } from 'express'

import passport from 'passport'
import jwt from 'jsonwebtoken'

import { pool } from '../database'

class AuthController {

  async login(req: Request, res: Response, next: NextFunction) {
		passport.authenticate("local.login", async (error, user, info) => {
			try {
				if (error || !user) {
					return next(error)
					// return res.status(401).json({info})
				}
				req.login(user, {session: false}, async (err) => {
					if (err) return next(err)
					const body = { _id: user.id, user: user.username, fullname: user.fullname }
					const token = jwt.sign({ user: body }, 'top_secret')
					return res.json({ token, body, message: 'successs' })
				})
			} catch(e) {
				return next(e)
			}
		})(req, res, next);	
  }
  
  async logout(req: Request, res: Response) {
		req.logout();
		res.send({success: true});
	}

	async validateUser(req: Request, res: Response) {
		const { username } = req.params;
		const result = await pool.query("SELECT * FROM users WHERE username = ?", [username])
		res.send(result.length > 0 ? true : false)
	}

	async registerUser(req: Request, res: Response) {
		res.json({
			message: "Usuario registrado exitósamente",
			user: req.user
		})
	}
}

export default new AuthController()