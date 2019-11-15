const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");


passport.use("local.login", new localStrategy({
	usernameField: "usuario",
	passwordField: "password",
	passReqToCallback: true
}, async (req, username, password, done) => {
	const rows = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", username);
	if (rows.length > 0) {
		const user = rows[0];
		const validPassword = await helpers.matchPassword(password, user.password);
		if (validPassword) {
			done(null, user, req.flash("success", "Bienvenido " + user.nombre_completo));
		} else {
			done(null, false, req.flash("failure", "Password Incorrecto"));
		}
	} else {
		return done(null, false, req.flash("failure", "Usuario Incorrecto"));
	}
}));

passport.use("local.register", new localStrategy({
	usernameField: "usuario",
	passwordField: "password",
	passReqToCallback: true
}, async (req, username, password, done) =>{
	const { nombre_completo } = req.body;
	const newUser = {
		usuario: username,
		password: password,
		nombre_completo: nombre_completo
	}
	newUser.password = await helpers.encryptPassword(password);
	const result = await pool.query("INSERT INTO usuarios SET ?", [newUser]);
	newUser.id = result.insertId;
	return done(null, newUser);

}));

passport.serializeUser((user, done) =>{
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const filas = await pool.query("SELECT * FROM usuarios WHERE id = ?", [id]);
	done(null, filas[0]);
})