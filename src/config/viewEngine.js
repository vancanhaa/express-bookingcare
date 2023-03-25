const express = require("express");

const configViewEngine = (app) => {
  //static file
  app.use(express.static("./src/public"));
  //view Engine
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
module.exports = configViewEngine;
