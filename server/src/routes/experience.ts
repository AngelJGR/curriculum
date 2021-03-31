import { Router } from 'express'

import ExperienceController from '../controllers/experienceController';

export default (auth: any): Router => {
	const ExperienceRouter: Router = Router()

	ExperienceRouter.get('/getExperiences', auth.isLoggedIn(), ExperienceController.getExperiences)
	ExperienceRouter.post('/getOrganizations', auth.isLoggedIn(), ExperienceController.getOrganizations)
	ExperienceRouter.post('/setExperience', auth.isLoggedIn(), ExperienceController.setExperience)
	ExperienceRouter.delete('/unsetExperience/:id', auth.isLoggedIn(), ExperienceController.unsetExperience)

	return ExperienceRouter
}
