const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const MySqlStore = require("express-mysql-session");
const passport = require("passport");

const { database } = require("./keys");

const app = express();
require("./lib/passport");

//Settings
app.set("PORT", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(".hbs", exphbs({
	defaultLayout: "main",
	layoutsDir: path.join(app.get("views"), "layouts"),
	partialsDir: path.join(app.get("views"), "partials"),
	extname: ".hbs",
	helpers: require("./lib/handlebars")

}));
app.set("view engine", ".hbs");

//Middlewares
app.use(cors())
app.use(session({
	secret: "Curriculum",
	resave: false,
	saveUninitialized: false,
	store: new MySqlStore(database)
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Globals Variables
app.use((req, res, next) => {
	app.locals.success = req.flash("success");
	app.locals.failure = req.flash("failure");
	app.locals.users = req.user;
	next();
});

//Routes
app.use(require("./routes/"));
app.use("/formation", require("./routes/formation"));
app.use("/experience", require("./routes/experience"));
app.use("/skills", require("./routes/skills"));
app.use("/person", require("./routes/person"));
app.use(require("./routes/login"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Starting the server

app.listen(app.get("PORT"), () => {
	console.log("Server on port " + app.get("PORT"));
});