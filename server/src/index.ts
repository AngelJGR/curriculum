import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
// import exphbs from 'express-handlebars'
import path from 'path'
// import flash from 'connect-flash'
import session from 'express-session'
import MySqlStore from 'express-mysql-session'
import passport from 'passport'

// Routes
import PersonRouter from './routes/person'
import FormationRouter from './routes/formation'
import ExperienceRouter from './routes/experience'
import SkillsRouter from './routes/skills'

// Libs
import { database } from "./keys";

const app = express();
require("./lib/passport");

//Settings
app.set("PORT", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
/* app.engine(".hbs", exphbs({
	defaultLayout: "main",
	layoutsDir: path.join(app.get("views"), "layouts"),
	partialsDir: path.join(app.get("views"), "partials"),
	extname: ".hbs",
	helpers: require("./lib/handlebars")

}));
app.set("view engine", ".hbs"); */

//Middlewares
app.use(cors())
app.use(session({
	secret: "Curriculum",
	resave: false,
	saveUninitialized: false,
	store: new (MySqlStore as any)(database)
}));
// app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Globals Variables
/* app.use((req, res, next) => {
	app.locals.success = req.flash("success");
	app.locals.failure = req.flash("failure");
	app.locals.users = req.user;
	next();
}); */

//Routes
app.use("/person", PersonRouter())
app.use("/formation", FormationRouter())
app.use("/experience", ExperienceRouter())
app.use("/skills", SkillsRouter())

//Public
app.use(express.static(path.join(__dirname, "public")))

//Starting the server

app.listen(app.get("PORT"), () => {
	console.log("Server on port... " + app.get("PORT"))
});