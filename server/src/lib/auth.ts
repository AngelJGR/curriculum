import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export default {
	isLoggedIn(): any{
		return passport.authenticate('jwt', { session: false })
	},

	/* isNotLoggedIn(req: Request, res: Response, next: NextFunction): any{
		if (!req.isAuthenticated()) {
			return next();
		} else {
			return next(new Error('Existe una sesión activa'));
		}
	} */
}