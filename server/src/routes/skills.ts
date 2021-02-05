import { Router } from 'express'

import SkillsController from '../controllers/skillsController';

export default (auth: any): Router => {
	const SkillsRouter: Router = Router()

	SkillsRouter.get('/getSkillsPerson/:idPerson', auth.isLoggedIn(), SkillsController.getSkillsPerson)
	SkillsRouter.post('/getSkills', auth.isLoggedIn(), SkillsController.getSkills)
	SkillsRouter.post('/setSkill', auth.isLoggedIn(), SkillsController.setSkill)
	SkillsRouter.delete('/unsetSkill/:id', auth.isLoggedIn(), SkillsController.unsetSkill)

	return SkillsRouter
}
