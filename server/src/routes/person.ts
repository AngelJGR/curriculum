import { Router } from 'express'

import PersonController from '../controllers/person'

/** RUTAS PARA BÁSICO **/
export default () => {
	const PersonRouter = Router()

	PersonRouter.get("/getPerson/:id", PersonController.getPerson)
	
	PersonRouter.post("/updatePerson/:idUser", PersonController.updatePerson)

	return PersonRouter
}
