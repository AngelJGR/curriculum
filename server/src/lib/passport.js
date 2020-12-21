const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");


passport.use("local.login", new localStrategy({
	usernameField: "user",
	passwordField: "password",
	passReqToCallback: true
}, async (req, username, password, done) => {
	try {
		const rows = await pool.query("SELECT * FROM users WHERE username = ?", username);
		if (rows.length > 0) {
			const user = rows[0];
			const validPassword = await helpers.matchPassword(password, user.password);
			if (validPassword) {
				done(null, user, { message: `Bienvenido ${user.nombre_completo}` });
				// done(null, user, req.flash('message', `Bienvenido ${user.nombre_completo}`));
			} else {
				done(null, false, { message: "Password Incorrecto" });
				// done(null, false, req.flash('message', "Password Incorrecto"));
			}
		} else {
			return done(null, false, { message: "Usuario Incorrecto" });
			// return done(null, false, req.flash("message", "Usuario Incorrecto") );
		}
	} catch (e) {
		return done(e)
	}
}));

passport.use("local.register", new localStrategy({
	usernameField: "user",
	passwordField: "password",
	passReqToCallback: true
}, async (req, username, password, done) =>{
	const newUser = {
		username,
		password,
		fullname: req.body.fullname
	}
	newUser.password = await helpers.encryptPassword(password);
	const result = await pool.query("INSERT INTO users SET ?", [newUser]);
	newUser.id = result.insertId;
	return done(null, newUser);

}));

passport.serializeUser((user, done) =>{
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const filas = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
	done(null, filas[0]);
})