let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const cors = require('cors');

let app = express();

let notesRouter = require("./routes/note");
let authRouter = require("./routes/auth");

const authenticate = require("./middleware/authenticate");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
  next(err);
});

app.use("/", authRouter);

app.use(authenticate);

app.use("/note", notesRouter);

module.exports = app;
