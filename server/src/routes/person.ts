import { Router } from 'express'

import PersonController from '../controllers/personController'

export default (auth: any): Router => {

	const PersonRouter: Router = Router()

	PersonRouter.get("/getPerson/:id", auth.isLoggedIn(), PersonController.getPerson)
	PersonRouter.post("/updatePerson/:idUser", auth.isLoggedIn(), PersonController.updatePerson)

	return PersonRouter
}
