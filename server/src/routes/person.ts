import { Router } from 'express'

import PersonController from '../controllers/personController'

import isLoggedIn from '../lib/auth'

export default (): Router => {
	const PersonRouter: Router = Router()

	PersonRouter.get("/getPerson/:id", PersonController.getPerson)
	PersonRouter.post("/updatePerson/:idUser", PersonController.updatePerson)

	return PersonRouter
}
