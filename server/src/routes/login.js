const express =require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken")

const pool = require("../database");

const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

//Login
/* router.get("/login", isNotLoggedIn, (req, res) => {
	res.render("./login");
}); */

router.post("/login", isNotLoggedIn, (req, res, next) => {
	console.log('1')
	passport.authenticate("local.login", async (error, user, info) => {
		console.log('1/2')
		try {
			console.log('2')
			if (error || user) {
				return next(new Error('Error'))
			}
			req.login(user, {session: false}, async (err) => {
				if (err) return next(err)
				console.log('Usuario', user)
				// const body = { _id: user.id }
			})
		} catch(e) {
			console.log('3')
			console.log(e)
		}
	})(req, res, next);	
});

router.get("/logout", isLoggedIn, (req, res) => {
	req.logout();
	res.redirect("/login");
});

router.get("/validateUser", async (req, res) => {
	const { user } = req.query;
	const result = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [user])
	res.send(result.length > 0 ? true : false)
})

router.post('/registerUser', passport.authenticate("local.register", { session: false }), async (req, res, next) => {
	console.log('Llegue')
	res.json({
		message: "Usuario registrado exitósamente",
		user: req.user
	})
})

module.exports = router;