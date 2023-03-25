const express = require("express");

const homeController = require("../controller/homeController");
const userController = require("../controller/userController");

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/logout", userController.handleLogout);
  router.get("/api/users", userController.handleGetAllUsers);
  router.get("/api/users/:id", userController.handleGetUserById);
  router.post("/api/users", userController.handleCreateNewUser);
  router.put("/api/users/:id", userController.handleUpdateUser);
  router.delete("/api/users/:id", userController.handleDeleteUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
