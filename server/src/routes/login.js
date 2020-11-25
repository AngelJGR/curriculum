const express =require("express");
const router = express.Router();
const passport = require("passport");

const pool = require("../database");

const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

//Login
router.get("/login", isNotLoggedIn, (req, res) => {
	res.render("./login");
});

// Ruta para agregar nuevo usuario para loggeo
/* router.post("/login", passport.authenticate("local.register", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: true
})); */

router.post("/login", isNotLoggedIn, (req, res, next) => {
	passport.authenticate("local.login", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true
	})(req, res, next);	
});

router.get("/logout", isLoggedIn, (req, res) => {
	req.logout();
	res.redirect("/login");
});

module.exports = router;