import { Router } from 'express'

import SkillsController from '../controllers/skillsController';

export default (): Router => {
	const SkillsRouter: Router = Router()

	SkillsRouter.get('/getSkillsPerson/:idPerson', SkillsController.getSkillsPerson)
	SkillsRouter.post('/getSkills', SkillsController.getSkills)
	SkillsRouter.post('/setSkill', SkillsController.setSkill)
	SkillsRouter.delete('/unsetSkill/:id', SkillsController.unsetSkill)

	return SkillsRouter
}
