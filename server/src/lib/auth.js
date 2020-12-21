module.exports = {

	isLoggedIn(req, res, next){
		if (req.isAuthenticated()) {
			return next();
		} else {
			return next(new Error('Se requiere iniciar sesión'));
		}
	},

	isNotLoggedIn(req, res, next){
		if (!req.isAuthenticated()) {
			return next();
		} else {
			return next(new Error('Existe una sesión activa'));
		}
	}

}