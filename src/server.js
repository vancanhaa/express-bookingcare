const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const cors = require("cors");

const connectDB = require("./config/connectDB");
const configViewEngine = require("./config/viewEngine");
const initWebRoutes = require("./routes/web");

const app = express();
// app.use(cors({ origin: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
dotenv.config();
const port = process.env.PORT || 6969;

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use viewEngine
configViewEngine(app);
//use Route
initWebRoutes(app);
//connect DB
connectDB();

app.listen(port, () => {
  console.log(`App is runing on the port http://localhost:${port}`);
});
