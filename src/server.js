const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use(function(req, res, next) {
    console.log(req.cookies.io);
    next();
});
app.use(require("./routes/index.routes"));

// static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'node_modules')));
module.exports = app;