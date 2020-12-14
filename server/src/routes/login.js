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
	passport.authenticate("local.login", async (error, user, info) => {
		try {
			if (error || !user) {
				return next(error)
				// return res.status(401).json({info})
			}
			req.login(user, {session: false}, async (err) => {
				if (err) return next(err)
				const body = { _id: user.id, user: user.usuario, fullname: user.nombre_completo }
				const token = jwt.sign({ user: body }, 'top_secret')
				return res.json({ token, body, message: 'successs' })
			})
		} catch(e) {
			return next(e)
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
	res.json({
		message: "Usuario registrado exitósamente",
		user: req.user
	})
})

module.exports = router;