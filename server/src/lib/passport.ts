import passport from 'passport'
import { Request } from 'express'
import { Strategy as localStrategy } from 'passport-local'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'

import { pool } from '../database'

import helpers from './helpers'

passport.use("local.login", new localStrategy({
	usernameField: "user",
	passwordField: "password",
	passReqToCallback: true
}, async (req: Request, username: string, password: string, done): Promise<void> => {
	try {
		const rows = await pool.query("SELECT * FROM users WHERE username = ?", username)
		if (rows.length > 0) {
			const user = rows[0]
			const validPassword = await helpers.matchPassword(password, user.password)
			if (validPassword) {
				done(null, user, <any>{ success: true, message: `Bienvenido ${user.fullname}` })
			} else {
				done(null, false, <any>{ success: false, message: "Password Incorrecto" })
			}
		} else {
			return done(null, false, <any>{ success: false, message: "Usuario Incorrecto" })
		}
	} catch (e) {
		return done(e)
	}
}))

passport.use("local.register", new localStrategy({
	usernameField: "user",
	passwordField: "password",
	passReqToCallback: true
}, async (req: Request, username: string, password: string, done): Promise<void> =>{
	const newUser = {
		id: null,
		username,
		password,
		fullname: req.body.fullname
	}
	newUser.password = await helpers.encryptPassword(password);
	const result = await pool.query("INSERT INTO users SET ?", [newUser])
	newUser.id = result.insertId;
	return done(null, newUser);
}))

passport.use('jwt', new JwtStrategy({
	secretOrKey: 'top_secret',
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (token: any, done): Promise<void> => {
	try {
		return done(null, token.user)
	} catch (error) {
			done(error)
	}
}))



/* passport.serializeUser((user: any, done): void =>{
	done(null, user.id);
});

passport.deserializeUser(async (id, done): Promise<void> => {
	const filas = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
	done(null, filas[0]);
}) */