import { Router } from 'express'

import PersonController from '../controllers/personController'

export default () => {
	const PersonRouter = Router()

	PersonRouter.get("/getPerson/:id", PersonController.getPerson)
	PersonRouter.post("/updatePerson/:idUser", PersonController.updatePerson)

	return PersonRouter
}
