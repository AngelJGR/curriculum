import { Router } from 'express'

import formationController from '../controllers/formationController';

export default (auth: any): Router => {
	const FormationRouter: Router = Router()

	FormationRouter.get('/getFormation/:id', auth.isLoggedIn(), formationController.getFormation)
	FormationRouter.post('/setFormation', auth.isLoggedIn(), formationController.setFormation)
	FormationRouter.delete('/unsetFormation/:id', auth.isLoggedIn(), formationController.unsetFormation)

	return FormationRouter
}
