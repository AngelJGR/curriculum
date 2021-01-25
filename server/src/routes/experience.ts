import { Router } from 'express'

import ExperienceController from '../controllers/experienceController';


export default () => {
	const ExperienceRouter = Router()

	ExperienceRouter.get('/getExperiences/:idPerson', ExperienceController.getExperiences)
	ExperienceRouter.post('/getOrganizations', ExperienceController.getOrganizations)
	ExperienceRouter.post('/setExperience', ExperienceController.setExperience)
	ExperienceRouter.delete('/unsetExperience/:id', ExperienceController.unsetExperience)

	return ExperienceRouter
}
