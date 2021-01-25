import { Router } from 'express'

import formationController from '../controllers/formationController';

export default () => {
	const FormationRouter = Router()

	FormationRouter.get('/getFormation/:id', formationController.getFormation)
	FormationRouter.post('/setCollegeDegree', formationController.setCollegeDegree)
	FormationRouter.delete('/unsetCollegeDegree/:id', formationController.unsetCollegeDegree)

	return FormationRouter
}
