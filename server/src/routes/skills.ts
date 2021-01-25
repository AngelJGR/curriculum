import { Router } from 'express'

import SkillsController from '../controllers/skillsController';

export default () => {
	const SkillsRouter = Router()

	SkillsRouter.get('/getSkillsPerson/:idPerson', SkillsController.getSkillsPerson)
	SkillsRouter.post('/getSkills', SkillsController.getSkills)
	SkillsRouter.post('/setSkill', SkillsController.setSkill)
	SkillsRouter.delete('/unsetSkill/:id', SkillsController.unsetSkill)

	return SkillsRouter
}


/* router.get("/getSkillsPerson/:idPerson", isLoggedIn, async (req, res) => {
	
}); */

/* router.post("/getSkills", async (req, res) => {
	
}); */

/* router.post("/setSkill", isLoggedIn, async (req, res) => {
	
}); */

/* router.delete("/unsetSkill/:id", async (req, res) => {
	
}); */
