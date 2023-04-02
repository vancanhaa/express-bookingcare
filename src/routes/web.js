const express = require("express");

const userController = require("../controller/userController");
const allCodeController = require("../controller/allCodeController");
const router = express.Router();

const initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/logout", userController.handleLogout);
  router.get("/api/users", userController.handleGetAllUsers);
  router.get("/api/users/:id", userController.handleGetUserById);
  router.post("/api/users", userController.handleCreateNewUser);
  router.put("/api/users/:id", userController.handleUpdateUser);
  router.delete("/api/users/:id", userController.handleDeleteUser);

  router.get("/api/allcode", allCodeController.handleGetAllCode);
  return app.use("/", router);
};

module.exports = initWebRoutes;
