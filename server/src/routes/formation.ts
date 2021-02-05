import { Router } from 'express'

import formationController from '../controllers/formationController';

export default (auth: any): Router => {
	const FormationRouter: Router = Router()

	FormationRouter.get('/getFormation/:id', auth.isLoggedIn(), formationController.getFormation)
	FormationRouter.post('/setCollegeDegree', auth.isLoggedIn(), formationController.setCollegeDegree)
	FormationRouter.delete('/unsetCollegeDegree/:id', auth.isLoggedIn(), formationController.unsetCollegeDegree)

	return FormationRouter
}
