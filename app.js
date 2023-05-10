var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// Router Location
var authRouter = require("./routes/auth");
var usersRouter = require("./routes/users");
var matkulRouter = require("./routes/matkul");
var discussionsRouter = require("./routes/discussions");
var commentsRouter = require("./routes/comments");

var app = express();

// CORS Settings
const corsOptions = {
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Router Path
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/matkul", matkulRouter);
app.use("/api/discussions", discussionsRouter);
app.use("/api/discussions/comments", commentsRouter);

module.exports = app;
