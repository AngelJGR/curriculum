import { Router } from 'express'
import passport from 'passport'

import AuthController from '../controllers/authController';

export default (): Router => {
	const AuthRouter: Router = Router()

	AuthRouter.post('/login', AuthController.login)
	AuthRouter.get('/logout', AuthController.logout)
	AuthRouter.get('/validateUser/:username', AuthController.validateUser)
	AuthRouter.post('/registerUser', passport.authenticate("local.register", { session: false }), AuthController.registerUser)

	return AuthRouter
}
