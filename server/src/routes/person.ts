import { Router } from 'express'

import PersonController from '../controllers/personController'

export default (auth: any): Router => {

	const PersonRouter: Router = Router()

	PersonRouter.get("/getPerson", auth.isLoggedIn(), PersonController.getPerson)
	PersonRouter.post("/updatePerson", auth.isLoggedIn(), PersonController.updatePerson)

	return PersonRouter
}
