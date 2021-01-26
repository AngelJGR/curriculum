import { Router } from 'express'

import ResumeController from '../controllers/resumeController'

export default () => {
	const ResumeRouter = Router()

	ResumeRouter.get("/:username", ResumeController.getUser)
	ResumeRouter.get("/", ResumeController.getMain)

	return ResumeRouter
}
