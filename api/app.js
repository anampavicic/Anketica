require('dotenv').config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

//const mysql = require("mysql");



const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const testAPIRouter = require("./routes/testAPI");
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const anketaRouter = require('./routes/anketa');
const profileRouter = require('./routes/profile');


const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/users", usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/anketa", anketaRouter);
app.use("/profile-page",profileRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    // res.status(err.status || 500);
    res.sendStatus(err.status ?? 500);
});


const Pool = require('pg').Pool

// zasto imamo 2 poola (ovdje i u db/index.js)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Anketica',
  password: 'bazepodataka',
  port: 5432,
})


module.exports = app;
